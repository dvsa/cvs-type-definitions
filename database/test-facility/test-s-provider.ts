
import { PutCommand, PutCommandOutput, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { PutCommandInput } from '@aws-sdk/lib-dynamodb/dist-types/commands/PutCommand';
import { QueryCommandInput } from '@aws-sdk/lib-dynamodb/dist-types/commands/QueryCommand';
import { ScanCommandInput } from '@aws-sdk/lib-dynamodb/dist-types/commands/ScanCommand';
import { DB, FEAT_FLAGS, LOGGER } from '@domain/di-tokens/Tokens';
import { ErrorEnum } from '@domain/enums/Error.enum';
import { HttpStatus } from '@domain/enums/HttpStatus.enum';
import { TEST_STATION_STATUS } from '@domain/enums/TestStationEnums';
import { CustomError } from '@domain/models/CustomError';
import { EmailPartialTestStation } from '@domain/models/EmailPartialTestStation';
import { OptionalTestStations } from '@domain/models/OptionalTestStation';
import { Timed } from '@dvsa/appdev-api-common/http/decorators';
import { DynamoDb } from '@dvsa/aws-utilities/classes/dynamo-db-client';
import { testStation } from '@dvsa/cvs-db-schemas';
import { TestStationSchema } from '@dvsa/cvs-type-definitions/types/v1/test-station';
import { eq, inArray, sql } from 'drizzle-orm';
import { Container, Service } from 'typedi';

@Service()
export class TestStationProvider {
    private readonly logger = Container.get(LOGGER);
    private static readonly dynamoDBTable = `cvs-${process.env.BRANCH}-test-stations`;
    private static readonly dynamoClient = DynamoDb.getClient();

    private get db() {
        return Container.get(DB);
    }

    private get featFlags() {
        return Container.get(FEAT_FLAGS);
    }

    // Base query for getting test station details
    private static readonly baseGetQuery = {
        testStationAddress: testStation.address,
        testStationName: testStation.name,
        testStationId: testStation.dynamicsTestStationId,
        testStationEmails: sql`CAST
            (${testStation.emailAddressesJson} AS JSON)`.as('testStationEmails'),
        testStationLatitude: sql`CAST
            (${testStation.latitude} AS DOUBLE)`.as('testStationLatitude'),
        testStationLongitude: sql`CAST
            (${testStation.longitude} AS DOUBLE)`.as('testStationLongitude'),
        testStationPNumber: testStation.pNumber,
        testStationPostcode: testStation.postcode,
        testStationAccessNotes: testStation.accessNotes,
        testStationType: testStation.type,
        testStationContactNumber: testStation.contactNumber,
        testStationStatus: testStation.status,
        testStationTown: testStation.town,
        testStationGeneralNotes: testStation.generalNotes,
        testStationCountry: testStation.country,
    };

    @Timed()
    public async getTestStationByPNumber(testStationPNumber: string): Promise<TestStationSchema> {
        if (!this.featFlags.testFacilityDB.enabled || !this.featFlags?.testFacilityDB?.readAurora) {
            const query: ScanCommandInput = {
                TableName: TestStationProvider.dynamoDBTable,
                FilterExpression: '#testStationPNumber = :testStationPNumber',
                ExpressionAttributeNames: {
                    '#testStationPNumber': 'testStationPNumber',
                },
                ExpressionAttributeValues: {
                    ':testStationPNumber': testStationPNumber,
                },
            };

            const response = await TestStationProvider.dynamoClient.send(new ScanCommand(query));

            if (!response?.Items?.[0] || response.Count === 0) {
                this.logger.info(`[ERROR]: TestStationProvider.getTestStation - ${ErrorEnum.NOT_FOUND_P_NUMBER}`);
                throw new CustomError(HttpStatus.NOT_FOUND, ErrorEnum.NOT_FOUND_P_NUMBER);
            }

            return response.Items[0] as TestStationSchema;
        }

        const query = this.db
            .select(TestStationProvider.baseGetQuery)
            .from(testStation)
            .where(eq(testStation.pNumber, testStationPNumber))
            .limit(1);

        this.logger.debug(`Querying test station with P Number: ${testStationPNumber}`, { query: query.toSQL() });

        const response = await query.execute();

        if (response.length === 0) {
            this.logger.info(`[ERROR]: TestStationProvider.getTestStation - ${ErrorEnum.NOT_FOUND_P_NUMBER}`);
            throw new CustomError(HttpStatus.NOT_FOUND, ErrorEnum.NOT_FOUND_P_NUMBER);
        }

        return response[0] as TestStationSchema;
    }

    @Timed()
    public async getAll(): Promise<TestStationSchema[]> {
        if (!this.featFlags?.testFacilityDB?.enabled || !this.featFlags?.testFacilityDB?.readAurora) {
            const params: ScanCommandInput = {
                TableName: TestStationProvider.dynamoDBTable,
                FilterExpression: '#testStationStatus IN(:activeStatus, :terminationReqStatus) ',
                ExpressionAttributeNames: {
                    '#testStationStatus': 'testStationStatus',
                },
                ExpressionAttributeValues: {
                    ':activeStatus': TEST_STATION_STATUS.ACTIVE,
                    ':terminationReqStatus': TEST_STATION_STATUS.TERMINATION_REQUESTED,
                },
            };

            const response = await TestStationProvider.dynamoClient.send(new ScanCommand(params));

            if (!response?.Items?.[0] || response.Count === 0) {
                this.logger.error(`[ERROR]: TestStationProvider.getAll - ${ErrorEnum.RESOURCE_NOT_FOUND}`);
                throw new CustomError(HttpStatus.NOT_FOUND, ErrorEnum.RESOURCE_NOT_FOUND);
            }

            return response.Items as TestStationSchema[];
        }

        const query = this.db
            .select(TestStationProvider.baseGetQuery)
            .from(testStation)
            .where(inArray(testStation.status, [TEST_STATION_STATUS.ACTIVE, TEST_STATION_STATUS.TERMINATION_REQUESTED]));

        this.logger.debug('Getting all test stations', { query: query.toSQL() });

        const response = await query.execute();

        if (response.length === 0) {
            this.logger.error(`[ERROR]: TestStationProvider.getAll - ${ErrorEnum.RESOURCE_NOT_FOUND}`);
            throw new CustomError(HttpStatus.NOT_FOUND, ErrorEnum.RESOURCE_NOT_FOUND);
        }

        return response as TestStationSchema[];
    }

    @Timed()
    public async getTestStationEmailByPNumber(testStationPNumber: string): Promise<EmailPartialTestStation[]> {
        if (!this.featFlags?.testFacilityDB?.enabled || !this.featFlags?.testFacilityDB?.readAurora) {
            const params: QueryCommandInput = {
                TableName: TestStationProvider.dynamoDBTable,
                IndexName: 'testStationPNumberIndex',
                KeyConditionExpression: '#testStationPNumber = :testStationPNumber',
                ExpressionAttributeNames: {
                    '#testStationPNumber': 'testStationPNumber',
                },
                ExpressionAttributeValues: {
                    ':testStationPNumber': testStationPNumber,
                },
            };

            const response = await TestStationProvider.dynamoClient.send(new QueryCommand(params));

            if (!response?.Items?.[0] || response.Count === 0) {
                this.logger.info(`TestStationProvider.getTestStationEmailByPNumber - ${ErrorEnum.RESOURCE_NOT_FOUND}`);
                throw new CustomError(HttpStatus.NOT_FOUND, ErrorEnum.RESOURCE_NOT_FOUND);
            }

            return response.Items as EmailPartialTestStation[];
        }

        const query = this.db
            .select({
                testStationPNumber: testStation.pNumber,
                testStationEmails: sql`CAST
                    (${testStation.emailAddressesJson} AS JSON)`.as('testStationEmails'),
                testStationId: testStation.dynamicsTestStationId,
            })
            .from(testStation)
            .where(eq(testStation.pNumber, testStationPNumber));

        this.logger.debug(`Querying test station emails with P Number: ${testStationPNumber}`, { query: query.toSQL() });

        const response = await query.execute();

        if (response.length === 0) {
            this.logger.info(`TestStationProvider.getTestStationEmailByPNumber - ${ErrorEnum.RESOURCE_NOT_FOUND}`);
            throw new CustomError(HttpStatus.NOT_FOUND, ErrorEnum.RESOURCE_NOT_FOUND);
        }

        return response as EmailPartialTestStation[];
    }

    @Timed()
    public async getTestStationIdByPNumber(testStationPNumber: string): Promise<string | null> {
        if (!this.featFlags?.testFacilityDB?.enabled || !this.featFlags?.testFacilityDB?.readAurora) {
            const params: QueryCommandInput = {
                TableName: TestStationProvider.dynamoDBTable,
                IndexName: 'testStationPNumberIndex',
                KeyConditionExpression: '#testStationPNumber = :testStationPNumber',
                ExpressionAttributeNames: {
                    '#testStationPNumber': 'testStationPNumber',
                },
                ExpressionAttributeValues: {
                    ':testStationPNumber': testStationPNumber,
                },
            };

            const testStation = await TestStationProvider.dynamoClient.send(new QueryCommand(params));

            if (!testStation || !testStation.Items || testStation.Count === 0) {
                this.logger.info(`Record not found for P Number: ${testStationPNumber}`);
                return '';
            }

            return testStation.Items[0].testStationId;
        }

        const query = this.db
            .select({ testStationId: testStation.dynamicsTestStationId })
            .from(testStation)
            .where(eq(testStation.pNumber, testStationPNumber))
            .limit(1);

        this.logger.debug(`Querying test station ID with P Number: ${testStationPNumber}`, { query: query.toSQL() });

        const response = await query.execute();

        if (response.length === 0) {
            this.logger.info(`Record not found for P Number: ${testStationPNumber}`);
            return '';
        }

        return response[0]?.testStationId ?? null;
    }

    @Timed()
    public async putItem(testStationItem: OptionalTestStations) {
        if (!this.featFlags.testFacilityDB.enabled || !this.featFlags?.testFacilityDB?.writeAurora) {
            const params: PutCommandInput = {
                TableName: TestStationProvider.dynamoDBTable,
                Item: testStationItem,
            };

            const result = (await TestStationProvider.dynamoClient.send(new PutCommand(params))) as PutCommandOutput & {
                UnprocessedItems?: unknown;
            };

            if (result.UnprocessedItems) {
                this.logger.error('[ERROR]: TestStationProvider.putItem - Item(s) not added', { result });
                throw new Error(ErrorEnum.FAILED_TO_ADD_ITEM);
            }

            return;
        }

        const testStationInsert: typeof testStation.$inferInsert = {
            dynamicsTestStationId: testStationItem.testStationId,
            accessNotes: testStationItem.testStationAccessNotes,
            address: testStationItem.testStationAddress,
            contactNumber: testStationItem.testStationContactNumber,
            country: testStationItem.testStationCountry,
            emailAddressesJson: JSON.stringify(testStationItem.testStationEmails),
            generalNotes: testStationItem.testStationGeneralNotes,
            latitude: testStationItem.testStationLatitude?.toString() ?? null,
            longitude: testStationItem.testStationLongitude?.toString() ?? null,
            name: testStationItem.testStationName,
            pNumber: testStationItem.testStationPNumber,
            postcode: testStationItem.testStationPostcode,
            status: testStationItem.testStationStatus,
            town: testStationItem.testStationTown,
            type: testStationItem.testStationType,
        };

        const txData = await this.db.transaction(async (tx) => {
            const queryResult = await tx
                .insert(testStation)
                .values(testStationInsert)
                .onDuplicateKeyUpdate({
                    set: {
                        ...testStationInsert,
                        id: sql`LAST_INSERT_ID
                            (${testStation.id})`,
                    },
                });

            const { affectedRows, insertId: transactionId } = queryResult[0];

            const eventType = affectedRows === 1 ? 'created' : 'updated';

            // @TODO: Outbox implementation pending decision on event handling mechanism
            // await tx.insert(outbox).values({
            // 	eventType: eventType,
            // 	aggregateType: 'test-station',
            // 	payload: JSON.stringify(testStationItem),
            // });

            return { eventType, transactionId };
        });

        this.logger.info('Upserted test station', { ...txData, pNumber: testStationItem.testStationPNumber });
    }
}
