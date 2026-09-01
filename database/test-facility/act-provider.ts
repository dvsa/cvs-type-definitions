import type {
    AttributeValue,
    BatchWriteItemInput,
    GetItemInput,
    PutItemInput,
    QueryInput,
} from '@aws-sdk/client-dynamodb/dist-types/models/models_0';
import { BatchWriteCommand, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { DB, FEAT_FLAGS, LOGGER } from '@domain/di-tokens/Tokens';
import type { GetActivityRequestModel } from '@domain/models/activities/GetActivityModel';
import { ActivityFilters } from '@domain/utils/ActivityFilters';
import { DateTime } from '@dvsa/appdev-api-common';
import { Timed } from '@dvsa/appdev-api-common/http/decorators';
import { DynamoDb } from '@dvsa/aws-utilities/classes/dynamo-db-client';
import { activity, outbox, testStation } from '@dvsa/cvs-db-schemas';
import { type ActivitySchema } from '@dvsa/cvs-type-definitions/types/v1/activity';
import { ActivityType } from '@dvsa/cvs-type-definitions/types/v1/enums/activityType.enum';
import { and, between, eq, gte, isNull, sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/mysql-core';
import type { SQLWrapper } from 'drizzle-orm/sql/sql';
import { NotFoundError } from 'routing-controllers';
import { Container, Service } from 'typedi';

@Service()
export class ActivityProvider {
    private readonly logger = Container.get(LOGGER);
    private static readonly dynamoDBTable = `cvs-${process.env.BRANCH}-activities`;
    private static readonly dynamoClient = DynamoDb.getClient();
    private readonly parentActivity = alias(activity, 'parentActivity');

    private get db() {
        return Container.get(DB);
    }

    private get featFlags() {
        return Container.get(FEAT_FLAGS);
    }

    // Base query for getting activity details
    private readonly baseGetQuery = {
        id: activity.activityUuid,
        activityType: activity.activityType,
        testStationName: testStation.name,
        testStationPNumber: testStation.pNumber,
        notes: activity.notes,
        closureReason: activity.closureReason,
        testStationType: testStation.type,
        testerName: activity.testerStaffName,
        testerStaffId: activity.testerStaffId,
        testerEmail: activity.testerStaffEmail,
        // In the DB, a list of test station emails exists. This unwraps the first email in that list
        // COALESCE handles the case where the array is empty, returning an empty string instead of null
        testStationEmail: sql`COALESCE
            (JSON_UNQUOTE(JSON_EXTRACT(CAST(${testStation.emailAddressesJson} AS JSON), '$[0]')), '')`.as(
            'testStationEmail'
        ),
        activityDay: sql`DATE_FORMAT
            (${activity.startDatetime}, '%Y-%m-%d')`.as('activityDay'),
        startTime: sql`DATE_FORMAT
            (${activity.startDatetime}, '%Y-%m-%dT%H:%i:%s.%fZ')`.as('startTime'),
        endTime: sql`DATE_FORMAT
            (${activity.endDatetime}, '%Y-%m-%dT%H:%i:%s.%fZ')`.as('endTime'),
        // Wait reason might be null, so we need to handle that case and return as empty array
        waitReason: sql`COALESCE
            (CAST(${activity.waitReason} AS JSON), JSON_ARRAY())`.as('waitReason'),
    };

    private static readonly baseUpsert = (
        item: ActivitySchema,
        dateNow: string,
        parentActivityId: number | null,
        testStationId: number
    ) => ({
        activityUuid: item.id,
        testerStaffId: item.testerStaffId,
        testerStaffName: item.testerName,
        testerStaffEmail: item.testerEmail,
        activityType: item.activityType,
        startDatetime: DateTime.formatForDB(item.startTime),
        endDatetime: item.endTime ? DateTime.formatForDB(item.endTime) : null,
        waitReason: item.waitReason?.length ? JSON.stringify(item.waitReason) : null,
        notes: item.notes,
        closureReason: item.closureReason,
        lastUpdatedById: item.testerStaffId,
        lastUpdatedByName: item.testerName,
        lastUpdatedDatetime: dateNow,
        parentActivityId,
        testStationId,
    });

    @Timed()
    public async get<T extends Record<string, AttributeValue> | object>(key: T): Promise<ActivitySchema> {
        if (!this.featFlags.testFacilityDB.enabled || !this.featFlags?.testFacilityDB?.readAurora) {
            const params: GetItemInput = {
                TableName: ActivityProvider.dynamoDBTable,
                Key: key as Record<string, AttributeValue>,
            };

            this.logger.debug('Params for get', { params });

            const result = await ActivityProvider.dynamoClient.send(new GetCommand(params));

            if (!result?.Item) {
                throw new NotFoundError('Activity not found.');
            }

            return result.Item as ActivitySchema;
        }

        const { id } = key as { id: string };

        const query = this.db
            .select(this.baseGetQuery)
            .from(activity)
            .where(eq(activity.activityUuid, id))
            .leftJoin(testStation, eq(activity.testStationId, testStation.id))
            // We re-join to an alias of activity to get parent activity ID
            .leftJoin(this.parentActivity, eq(activity.parentActivityId, this.parentActivity.id))
            .limit(1);

        this.logger.debug(`Query for ActivityProvider.get: ${query.toSQL().sql}`, { query: query.toSQL() });

        const response = await query.execute();

        if (response.length === 0) {
            throw new NotFoundError('Activity not found.');
        }

        return response[0] as unknown as ActivitySchema;
    }

    @Timed()
    public async updateMany(activities: ActivitySchema[]): Promise<void> {
        if (!this.featFlags.testFacilityDB.enabled || !this.featFlags?.testFacilityDB?.writeAurora) {
            const itemBatches: ActivitySchema[][] = [];

            // copy the activities array to avoid mutating the original
            const activityList = structuredClone(activities);

            // batch items in groups of 25 - the maximum number of items that can be written in a single batch
            while (activityList.length > 0) {
                itemBatches.push(activityList.splice(0, 25));
            }

            await Promise.all(
                itemBatches.map(async (batch) => {
                    const query = {
                        RequestItems: {
                            [ActivityProvider.dynamoDBTable]: batch.map((item) => ({
                                PutRequest: { Item: item },
                            })),
                        },
                    } as unknown as BatchWriteItemInput;

                    return ActivityProvider.dynamoClient.send(new BatchWriteCommand(query));
                })
            );

            return;
        }

        this.logger.info(`Updating ${activities.length} activities in Aurora`);

        await Promise.all(activities.map((activity) => this.upsert(activity)));
    }

    @Timed()
    public async upsert(item: ActivitySchema): Promise<void> {
        if (!this.featFlags.testFacilityDB.enabled || !this.featFlags?.testFacilityDB?.writeAurora) {
            const params: PutItemInput = {
                TableName: ActivityProvider.dynamoDBTable,
                Item: item as unknown as Record<string, AttributeValue>,
                ReturnValues: 'ALL_OLD',
            };

            this.logger.debug('Params for update', { params });

            await ActivityProvider.dynamoClient.send(new PutCommand(params));

            return;
        }

        // Lookup parentActivityId and testStationId- If there is no test station found, an error will be thrown
        const [parentActivityId, testStationId] = await Promise.all([
            this.getParentActivityId(item.parentId),
            this.getTestStationId(item.testStationPNumber),
        ]);

        const currentDateTime = DateTime.formatForDB(new Date());

        const baseFields = ActivityProvider.baseUpsert(item, currentDateTime, parentActivityId, testStationId);

        const txData = await this.db.transaction(async (tx) => {
            const queryResult = await tx
                .insert(activity)
                .values({
                    ...baseFields,
                    createdById: item.testerStaffId,
                    createdByName: item.testerName,
                    insertedDatetime: currentDateTime,
                })
                .onDuplicateKeyUpdate({
                    set: {
                        ...baseFields,
                        id: sql`LAST_INSERT_ID
                            (${activity.id})`,
                    },
                });

            const { affectedRows, insertId: transactionId } = queryResult[0];

            const eventType = affectedRows === 1 ? 'created' : 'updated';

            await tx.insert(outbox).values({
                eventType: eventType,
                aggregateType: 'activity',
                payload: item,
            });

            return { eventType, transactionId };
        });

        this.logger.info(`Upserted activity with UUID: ${item.id}`, { ...txData, parentId: item.parentId });
    }

    @Timed()
    public async findByStaffId(testerStaffId: string): Promise<ActivitySchema[]> {
        if (!this.featFlags.testFacilityDB.enabled || !this.featFlags?.testFacilityDB?.readAurora) {
            const params: QueryInput = {
                TableName: ActivityProvider.dynamoDBTable,
                IndexName: 'StaffIndex',
                KeyConditionExpression: 'testerStaffId = :testerStaffId',
                FilterExpression: 'attribute_type(endTime, :NULL)',
                ExpressionAttributeValues: {
                    ':testerStaffId': testerStaffId,
                    ':NULL': 'NULL',
                } as unknown as Record<string, AttributeValue>,
            };

            this.logger.debug('Params for findOngoingActivitiesByStaffId', { params });

            return DynamoDb.recursiveFetch(QueryCommand, params);
        }

        const query = this.db
            .select(this.baseGetQuery)
            .from(activity)
            .leftJoin(testStation, eq(activity.testStationId, testStation.id))
            // We re-join to an alias of activity to get parent activity ID
            .leftJoin(this.parentActivity, eq(activity.parentActivityId, this.parentActivity.id))
            .where(and(eq(activity.testerStaffId, testerStaffId), isNull(activity.endDatetime)));

        this.logger.debug(`Query for findByStaffId: ${query.toSQL().sql}`, { query: query.toSQL() });

        const response = await query.execute();

        return (response as unknown as ActivitySchema[]) ?? [];
    }

    @Timed()
    public async findMany(activityDetails: GetActivityRequestModel): Promise<ActivitySchema[]> {
        if (!this.featFlags.testFacilityDB.enabled || !this.featFlags?.testFacilityDB?.readAurora) {
            const { activityType, isOpen } = activityDetails;

            const keyExpressionAttribute = {
                ':activityType': activityType,
            } as unknown as Record<string, AttributeValue>;

            // "isOpen" is used to determine which additional expressions are needed
            // fromStartTime is mandatory but not provided by auto-close so always set to 01-01-2020
            if (isOpen) {
                Object.assign(keyExpressionAttribute, {
                    ':fromStartTime': new Date(2020, 0, 1).toISOString(),
                    ':NULL': 'NULL',
                });
            } else {
                Object.assign(keyExpressionAttribute, {
                    ':fromStartTime': activityDetails.fromStartTime,
                    ':toStartTime': activityDetails.toStartTime,
                });
            }

            const params: QueryInput = {
                TableName: ActivityProvider.dynamoDBTable,
                IndexName: 'ActivityTypeIndex',
                KeyConditionExpression: 'activityType = :activityType AND startTime >= :fromStartTime',
                ExpressionAttributeValues: {
                    ...keyExpressionAttribute,
                    ...this.mapOptionalFilterValues(activityDetails),
                } as unknown as Record<string, AttributeValue>,
            };

            // "isOpen" is used to determine which additional conditions are needed
            // auto-close only retrieves activities with no endTime
            if (isOpen) {
                params.FilterExpression = 'attribute_type(endTime, :NULL)';
            } else {
                params.KeyConditionExpression =
                    'activityType = :activityType AND startTime BETWEEN :fromStartTime AND :toStartTime';

                const filterExpression = this.getOptionalFilters('', activityDetails);

                if (filterExpression) {
                    params.FilterExpression = filterExpression;
                }
            }

            this.logger.debug('Params for findActivities', { params });

            // sort data in the provider layer as this would be done via a DB query
            return ActivityFilters.returnOrderedActivities(await DynamoDb.recursiveFetch(QueryCommand, params));
        }

        const conditions: (SQLWrapper | undefined)[] = [
            // check activity types are equal
            eq(activity.activityType, activityDetails.activityType as string),
        ];

        // if testerStaffId is provided, use it
        if (activityDetails.testerStaffId) {
            conditions.push(eq(activity.testerStaffId, activityDetails.testerStaffId));
        }
        // if testStationPNumber is provided, use it
        if (activityDetails.testStationPNumber) {
            conditions.push(eq(testStation.pNumber, activityDetails.testStationPNumber));
        }

        // if isOpen is true, check startDatetime is after 01-01-2020 and endDatetime is null
        // else if fromStartTime and toStartTime are provided, check startDatetime is between them
        if (activityDetails.isOpen) {
            conditions.push(gte(activity.startDatetime, '2020-01-01T00:00:00.000Z'), isNull(activity.endDatetime));
        } else if (activityDetails.fromStartTime && activityDetails.toStartTime) {
            conditions.push(between(activity.startDatetime, activityDetails.fromStartTime, activityDetails.toStartTime));
        }

        const query = this.db
            // only include the parentId when querying for non-visit activities
            .select(
                activityDetails.activityType === ActivityType.VISIT
                    ? { ...this.baseGetQuery }
                    : { ...this.baseGetQuery, parentId: this.parentActivity.activityUuid }
            )
            .from(activity)
            .leftJoin(testStation, eq(activity.testStationId, testStation.id))
            // We re-join to an alias of activity to get parent activity ID
            .leftJoin(this.parentActivity, eq(activity.parentActivityId, this.parentActivity.id))
            .where(and(...conditions))
            .orderBy(activity.startDatetime);

        this.logger.debug('Getting activities', { query: query.toSQL() });

        const rows = await query.execute();

        return rows as unknown as ActivitySchema[];
    }

    private mapOptionalFilterValues({
                                        testStationPNumber,
                                        testerStaffId,
                                    }: GetActivityRequestModel): Partial<{ [key: string]: string }> {
        const filterObject: Partial<{ [key: string]: string }> = {};

        //add the optional filters if they are provided
        if (testStationPNumber) {
            filterObject[':testStationPNumber'] = testStationPNumber;
        }

        if (testerStaffId) {
            filterObject[':testerStaffId'] = testerStaffId;
        }

        return filterObject;
    }

    private getOptionalFilters(
        filterExpression: string,
        { testStationPNumber, testerStaffId }: Pick<GetActivityRequestModel, 'testStationPNumber' | 'testerStaffId'>
    ): string {
        // if there are no additional filters, return the original filter expression
        if (!testerStaffId && !testStationPNumber) {
            return filterExpression;
        }

        // determine which filters are provided and add them to the filter expression
        const additionalFilters = [
            testStationPNumber && 'testStationPNumber = :testStationPNumber',
            testerStaffId && 'testerStaffId = :testerStaffId',
        ].filter(Boolean) as string[];

        // join together the additional filters with an AND
        const joinedAdditionalFilters = additionalFilters.join(' AND ');

        return filterExpression ? `${filterExpression} AND ${joinedAdditionalFilters}` : joinedAdditionalFilters;
    }

    private async getParentActivityId(activityUuid: string | undefined): Promise<number | null> {
        if (!activityUuid) return null;

        const res = await this.db
            .select({ id: activity.id })
            .from(activity)
            .where(eq(activity.activityUuid, activityUuid))
            .limit(1);

        return res.length && res[0].id ? res[0].id : null;
    }

    private async getTestStationId(pNumber: string): Promise<number> {
        const res = await this.db.select().from(testStation).where(eq(testStation.pNumber, pNumber)).limit(1);

        if (!res.length) {
            throw new NotFoundError(`Test station with P Number ${pNumber} not found.`);
        }

        return res[0].id;
    }
}
