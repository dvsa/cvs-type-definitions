import { LOGGER } from '@domain/di-tokens/Tokens';
import type { GetByIdResponseModel } from '@domain/models/GetByIdResponseModel';
import type { GetTestTypesByIdQueryRequest } from '@domain/models/GetTestTypesByIdQueryRequest';
import { TestTypeFilter } from '@domain/utils/TestTypeFilter';
import { TestTypeUtils } from '@domain/utils/TestTypeUtils';
import type { GETTestTypeSchema } from '@dvsa/cvs-type-definitions/types/test-type/get';
import type { TestCodeSchema } from '@dvsa/cvs-type-definitions/types/test-type/testCode';
import { TestTypeProvider } from '@providers/TestTypeProvider';
import { NotFoundError } from 'routing-controllers';
import { Container, Inject, Service } from 'typedi';

@Service()
export class TestTypeService {
    private readonly logger = Container.get(LOGGER);
    private static cachedTestTypes: GETTestTypeSchema[];
    private readonly testTypeFilter = new TestTypeFilter();
    private readonly testTypeUtils = new TestTypeUtils();

    constructor(@Inject() private readonly testTypeProvider: TestTypeProvider) {}

    // @TODO: The majority of the logic here should be shifted right i.e. to the provider once in RDS
    // We should aim to do the filtering etc at DB level where possible
    async getTestTypeList(typeOfTest?: string): Promise<GETTestTypeSchema[]> {
        await this.retrieveOrStoreCache();

        // deep clone testTypes to avoid mutating the cached data
        const testTypes = structuredClone(TestTypeService.cachedTestTypes);

        // remove testTypeClassification and testCodes from testType objects
        this.testTypeUtils.purgeTestTypes(testTypes);

        // filter test types returned based on value of typeOfTest
        const filteredTestTypes = this.testTypeFilter.filterTaxonomyTypes(testTypes, typeOfTest);

        // sort filtered test types by sortId
        return this.testTypeUtils.sortTestTypes(filteredTestTypes);
    }

    // @TODO: The majority of the logic here should be shifted right i.e. to the provider once in RDS
    // We should aim to do the filtering etc at DB level where possible
    async getTestTypeById(id: string, filterExpression: GetTestTypesByIdQueryRequest): Promise<GetByIdResponseModel> {
        await this.retrieveOrStoreCache();

        // deep clone testTypes to avoid mutating the cached data
        const testTypes = structuredClone(TestTypeService.cachedTestTypes);

        // find specific test type by id
        const testType = this.testTypeUtils.findTestType({ id, testTypes });

        if (!testType) {
            throw new NotFoundError('No test type found');
        }

        if (!testType.testCodes) {
            throw new NotFoundError('No test codes found for test type');
        }

        // apply filters to testCodes based on filterExpression
        const testCodes: TestCodeSchema[] = this.testTypeFilter.applyFilters(testType.testCodes, filterExpression);

        if (testCodes.length === 0) {
            throw new NotFoundError('No resources match the search criteria.');
        }

        if (testCodes.length > 1) {
            this.logger.error(`Number of test codes after applying filters: ${testCodes.length}`, {
                testCodes,
                filterExpression,
            });
            throw new Error('More than one testType was retrieved');
        }

        return this.generateResponse(testType, testCodes[0], filterExpression.fields);
    }

    private generateResponse(
        testType: GETTestTypeSchema,
        testCode: TestCodeSchema,
        fields: string[]
    ): GetByIdResponseModel {
        // generate response and immediate set the id
        const response: GetByIdResponseModel = {
            id: testType.id,
        };
        // populate the response object with values from testCode or testType if they exist
        for (const field of fields) {
            if (Object.hasOwn(testCode, field)) {
                const value = testCode[field as keyof TestCodeSchema];
                response[field as keyof GetByIdResponseModel] = value as string;
            } else if (Object.hasOwn(testType, field)) {
                const value = testType[field as keyof GETTestTypeSchema];
                response[field as keyof GetByIdResponseModel] = value as string;
            }
        }
        return response;
    }

    private async retrieveOrStoreCache(): Promise<void> {
        if (!TestTypeService.cachedTestTypes) {
            this.logger.debug('Test types not cached, fetching from provider');
            const testTypes = await this.testTypeProvider.findAll();

            TestTypeService.cachedTestTypes = JSON.parse(JSON.stringify(testTypes));
        } else {
            this.logger.debug('Test types returned from static cache');
        }
    }
}
