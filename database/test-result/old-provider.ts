import {
    type AttributeValue,
    ConditionalCheckFailedException,
    type QueryInput,
    TransactWriteItemsCommand,
} from '@aws-sdk/client-dynamodb';
import {
    PutCommand,
    type PutCommandInput,
    QueryCommand,
    type QueryCommandInput,
    TransactWriteCommand,
    type TransactWriteCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { LOGGER } from '@domain/di-tokens/Tokens';
import { TestResultResponseEnum } from '@domain/enums/TestResultResponse.enum';
import type { PatchMedia } from '@domain/models/PatchMedia';
import { FindBySystemNumberModel } from '@domain/models/test-results/FindBySystemNumberModel';
import { FindByTesterStaffIdModel } from '@domain/models/test-results/FindByTesterStaffIdModel';
import { DateTime, HttpStatus } from '@dvsa/appdev-api-common';
import { Timed } from '@dvsa/appdev-api-common/http/decorators';
import { DynamoDb } from '@dvsa/aws-utilities/classes/dynamo-db-client';
import { EnvironmentVariables } from '@dvsa/cvs-microservice-common/classes/misc/env-vars';
import type { TestResultSchema } from '@dvsa/cvs-type-definitions/types/v1/test-result';
import { InternalServerError, NotFoundError } from 'routing-controllers';
import { Container, Service } from 'typedi';

@Service()
export class TestResultProvider {
    private readonly logger = Container.get(LOGGER);
    private static readonly dynamoDBTable = `cvs-${EnvironmentVariables.get('BRANCH')}-test-results`;
    private static readonly dynamoClient = DynamoDb.getClient(
        { region: process.env.AWS_REGION },
        {
            marshallOptions: {
                convertEmptyValues: true,
                removeUndefinedValues: true,
            },
        }
    );

    @Timed()
    async findByVinAndSysNumber(vin: string, systemNumber: string): Promise<TestResultSchema[]> {
        this.logger.info(`Getting tests for vin: ${vin}`);

        const params: QueryCommandInput = {
            TableName: TestResultProvider.dynamoDBTable,
            KeyConditionExpression: '#vin = :vin',
            ExpressionAttributeNames: {
                '#vin': 'vin',
            },
            ExpressionAttributeValues: {
                ':vin': vin,
            },
        };

        const result = await TestResultProvider.dynamoClient.send(new QueryCommand(params));

        if (!result || !result.Items?.length) {
            return [];
        }

        return (result.Items as TestResultSchema[]).filter((result) => result.systemNumber === systemNumber);
    }

    @Timed()
    async findBySystemNumber(params: FindBySystemNumberModel): Promise<TestResultSchema[]> {
        const query: QueryInput = {
            TableName: TestResultProvider.dynamoDBTable,
            IndexName: 'SysNumIndex',
            KeyConditionExpression: 'systemNumber = :systemNumber',
            ExpressionAttributeValues: {
                ':systemNumber': params.systemNumber,
                ...this.mapOptionalFilterValues(params),
            } as unknown as Record<string, AttributeValue>,
        };

        const filterExp = this.getSystemNumberFilters(params);

        if (filterExp) {
            query.FilterExpression = filterExp;
        }

        this.logger.debug('Params for findBySystemNumber', { query });

        // @TODO: Check if results need to be ordered

        // sort data in the provider layer as this would be done via a DB query
        return await DynamoDb.recursiveFetch(QueryCommand, query);
    }

    @Timed()
    async findByTesterStaffId(params: FindByTesterStaffIdModel): Promise<TestResultSchema[]> {
        const query: QueryInput = {
            TableName: TestResultProvider.dynamoDBTable,
            IndexName: 'TesterStaffIdIndex',
            KeyConditionExpression: 'testerStaffId = :testerStaffId AND testStartTimestamp > :testStartTimestamp',
            ExpressionAttributeValues: {
                ':testerStaffId': params.testerStaffId,
                ...this.mapOptionalFilterValues(params),
            } as unknown as Record<string, AttributeValue>,
        };

        const filterExp = this.getTesterStaffIdFilters(params);

        if (filterExp) {
            query.FilterExpression = filterExp;
        }

        this.logger.debug('Params for findByTesterStaffId', { query });

        // @TODO: Check if results need to be ordered

        // sort data in the provider layer as this would be done via a DB query
        return await DynamoDb.recursiveFetch(QueryCommand, query);
    }

    @Timed()
    async insert(
        testResult: TestResultSchema
    ): Promise<{ testResultId: string; message: TestResultResponseEnum } | null> {
        const params: PutCommandInput = {
            TableName: TestResultProvider.dynamoDBTable,
            Item: testResult,
            ConditionExpression: 'testResultId <> :testResultIdVal',
            ExpressionAttributeValues: {
                ':testResultIdVal': testResult.testResultId,
            },
        };

        this.logger.debug('Params for insert', { params });

        try {
            const res = await TestResultProvider.dynamoClient.send(new PutCommand(params));

            if (res.$metadata.httpStatusCode === HttpStatus.OK) {
                return { testResultId: testResult.testResultId, message: TestResultResponseEnum.CREATED_SUCCESSFULLY };
            }

            return null;
        } catch (err) {
            // This is to cater for a duplicate ID being submitted, in which case we want to return a 201 response
            if (err instanceof ConditionalCheckFailedException) {
                return { testResultId: testResult.testResultId, message: TestResultResponseEnum.ALREADY_EXISTS };
            }

            throw err;
        }
    }

    @Timed()
    async updateMany(testResults: TestResultSchema[]) {
        try {
            this.logger.info('Updating test results');

            const transactWriteParams: TransactWriteCommandInput = { TransactItems: [] };

            for (const result of testResults) {
                transactWriteParams.TransactItems?.push({
                    Put: {
                        TableName: TestResultProvider.dynamoDBTable,
                        Item: marshall(result, { removeUndefinedValues: true }),
                    },
                });
            }

            return await TestResultProvider.dynamoClient.send(new TransactWriteItemsCommand(transactWriteParams));
        } catch (error) {
            throw new Error(`Error updating test results: ${JSON.stringify(error)}`);
        }
    }

    @Timed()
    async patchMedia(vin: string, systemNumber: string, testResultID: string, mediaPayload: PatchMedia) {
        const testResults = await this.findByVinAndSysNumber(vin, systemNumber);

        if (testResults.length === 0) {
            throw new NotFoundError(`Test result not found by VIN/System Num. ${JSON.stringify({ vin, systemNumber })}`);
        }

        const testResultByTRID = testResults.filter((tr) => tr.testResultId === testResultID);

        if (testResultByTRID.length === 0) {
            throw new NotFoundError(
                `Test result not found by VIN/System Num & Test Result ID. ${JSON.stringify({ vin, systemNumber, testResultID })}`
            );
        }

        if (testResultByTRID.length !== 1) {
            throw new InternalServerError(
                `Multiple test results found by VIN/System Num & Test Result ID. ${JSON.stringify({ vin, systemNumber, testResultID })}`
            );
        }

        const [testResultRecord] = testResultByTRID;

        this.logger.debug(`Patching record for media with test result ID ${testResultRecord.testResultId}`);

        if (mediaPayload.category === 'approvals') {
            testResultRecord.media = mediaPayload.media.map((m) => ({
                type: m.type,
                path: m.path,
            }));
        } else {
            for (const media of mediaPayload.media) {
                const [, defectPart] = media.path.split('/');
                if (!defectPart) continue;

                const parts = defectPart.split('-');
                const testTypeIndex = Number(parts.at(-2));
                const defectIndex = Number(parts.at(-1));

                if (Number.isNaN(testTypeIndex) || Number.isNaN(defectIndex)) {
                    this.logger.warn('Unable to parse media path indexes', { path: media.path });
                    continue;
                }

                const defect = testResultRecord.testTypes[testTypeIndex]?.defects?.[defectIndex];
                if (!defect?.media?.length) continue;

                const existingFailReasonIndex = defect.media.findIndex(
                    (existingMedia) => existingMedia.path === media.path && existingMedia.type === 'failReason'
                );

                // No failed placeholder to replace, so do nothing
                if (existingFailReasonIndex === -1) continue;

                defect.media[existingFailReasonIndex] = { type: media.type, path: media.path };
            }
        }

        const res = await TestResultProvider.dynamoClient.send(
            new PutCommand({
                TableName: TestResultProvider.dynamoDBTable,
                Item: JSON.parse(JSON.stringify(testResultRecord)),
            })
        );

        if (res.$metadata.httpStatusCode === HttpStatus.OK) {
            return testResultRecord;
        }

        this.logger.error('Something went wrong with patch', { res });

        throw new Error('Patch failed');
    }

    @Timed()
    async update(testResult: TestResultSchema): Promise<string | null> {
        const params: TransactWriteCommandInput = {
            TransactItems: [
                {
                    Put: {
                        TableName: TestResultProvider.dynamoDBTable,
                        Item: JSON.parse(JSON.stringify(testResult)),
                        ConditionExpression: 'systemNumber = :systemNumber AND testResultId = :oldTestResultId AND vin = :vin',
                        ExpressionAttributeValues: {
                            ':systemNumber': testResult.systemNumber,
                            ':vin': testResult.vin,
                            ':oldTestResultId': testResult.testResultId,
                        },
                    },
                },
            ],
        };

        this.logger.debug('Params for transact write', { params });

        const res = await TestResultProvider.dynamoClient.send(new TransactWriteCommand(params));

        if (res.$metadata.httpStatusCode === HttpStatus.OK) {
            return testResult.testResultId;
        }

        return null;
    }

    private mapOptionalFilterValues(
        data: FindBySystemNumberModel | FindByTesterStaffIdModel
    ): Partial<{ [key: string]: string }> {
        const filterObject: Partial<{ [key: string]: string }> = {};

        const { fromDateTime, toDateTime, testStationPNumber } = data;

        // add the optional filters if they are provided
        if (fromDateTime) {
            filterObject[':testStartTimestamp'] = DateTime.at(fromDateTime)?.toISOString();
        }

        if (toDateTime) {
            filterObject[':testEndTimestamp'] = DateTime.at(toDateTime)?.toISOString();
        }

        if (testStationPNumber) {
            filterObject[':testStationPNumber'] = testStationPNumber;
        }

        const testStatus = (data as FindBySystemNumberModel).status || (data as FindByTesterStaffIdModel).testStatus;
        if (testStatus) {
            filterObject[':testStatus'] = testStatus;
        }

        const testResultId = (data as FindBySystemNumberModel).testResultId;
        if (testResultId) {
            filterObject[':testResultId'] = testResultId;
        }

        this.logger.debug('Mapped filter values', { filterObject });

        return filterObject;
    }

    private getSystemNumberFilters({
                                       testStationPNumber,
                                       fromDateTime,
                                       toDateTime,
                                       testResultId,
                                       status,
                                   }: Pick<
        FindBySystemNumberModel,
        'status' | 'testResultId' | 'testStationPNumber' | 'fromDateTime' | 'toDateTime'
    >): string {
        if (!testStationPNumber && !fromDateTime && !toDateTime && !testResultId && !status) {
            return '';
        }

        return [
            testStationPNumber && 'testStationPNumber = :testStationPNumber',
            fromDateTime && 'testStartTimestamp > :testStartTimestamp',
            toDateTime && 'testEndTimestamp < :testEndTimestamp',
            testResultId && 'testResultId = :testResultId',
            status && 'testStatus = :testStatus',
        ]
            .filter(Boolean)
            .join(' AND ');
    }

    private getTesterStaffIdFilters({
                                        testStationPNumber,
                                        toDateTime,
                                        testStatus,
                                    }: Pick<FindByTesterStaffIdModel, 'testStatus' | 'testStationPNumber' | 'toDateTime'>): string {
        if (!testStationPNumber && !toDateTime && !testStatus) {
            return '';
        }

        return [
            testStatus && 'testStatus = :testStatus',
            testStationPNumber && 'testStationPNumber = :testStationPNumber',
            DateTime.at(toDateTime)?.toISOString() && 'testEndTimestamp <= :testEndTimestamp',
        ]
            .filter(Boolean)
            .join(' AND ');
    }
}
