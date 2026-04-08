
import type { GetTestTypeByIdQueryParams } from '@domain/models/GetTestTypeByIdQueryParams';
import type { GetTestTypesByIdQueryRequest } from '@domain/models/GetTestTypesByIdQueryRequest';
import type { GETTestTypeSchema } from '@dvsa/cvs-type-definitions/types/test-type/get';
import type { TestCodeSchema } from '@dvsa/cvs-type-definitions/types/test-type/testCode';

export class TestTypeFilter {
    public fieldInFilterExpressionMatchesTheOneInTestCode(
        testCode: TestCodeSchema,
        filterExpression: GetTestTypesByIdQueryRequest,
        field: string
    ) {
        const filterOnField = (filterVal: keyof TestCodeSchema) => {
            const filterField = testCode[filterVal];
            const requestedValue = filterExpression[getFilterFieldWithoutFor(filterVal)];
            if (Array.isArray(filterField)) {
                return filterField.some((arrayElement: string | number) => includesOrEquals(arrayElement, requestedValue));
            }
            return includesOrEquals(filterField, requestedValue);
        };

        const includesOrEquals = <T>(filterField: T, requestedValue: string[] | string | number | undefined) => {
            if (Array.isArray(requestedValue)) {
                return requestedValue.includes(filterField as string);
            }
            return requestedValue === filterField;
        };

        const getFilterFieldWithoutFor = (filterVal: keyof TestCodeSchema): keyof GetTestTypeByIdQueryParams => {
            const rightLetters = filterVal.slice(3); // cut off the leading "for", but still got a capital letter leading
            return (rightLetters[0].toLowerCase() + rightLetters.slice(1)) as keyof GetTestTypeByIdQueryParams; // switch first letter to lower case, and rejoin with rest of string
        };

        switch (field) {
            case 'forVehicleType':
            case 'forVehicleSize':
            case 'forVehicleConfiguration':
            case 'forVehicleAxles':
            case 'forEuVehicleCategory':
            case 'forVehicleClass':
            case 'forVehicleSubclass':
            case 'forVehicleWheels':
                return filterOnField(field);
            default:
                throw new Error('Field you filtered by does not exist');
        }
    }

    public applyFilters(testCodes: TestCodeSchema[], filterExpression: GetTestTypesByIdQueryRequest): TestCodeSchema[] {
        const requestFieldMap = {
            forVehicleType: 'vehicleType',
            forVehicleSize: 'vehicleSize',
            forVehicleConfiguration: 'vehicleConfiguration',
            forVehicleAxles: 'vehicleAxles',
            forEuVehicleCategory: 'euVehicleCategory',
            forVehicleClass: 'vehicleClass',
            forVehicleSubclass: 'vehicleSubclass',
            forVehicleWheels: 'vehicleWheels',
        };

        const filterFields = Object.keys(requestFieldMap);

        return (testCodes ?? []).filter((testCode) => {
            // Check each filter field
            return filterFields.every((field) => {
                const requestField = requestFieldMap[field as keyof typeof requestFieldMap];

                // Skip the filter if:
                // 1. The field doesn't exist in the test code, OR
                // 2. The corresponding field isn't in the filter expression
                if (
                    !testCode[field as keyof TestCodeSchema] ||
                    !filterExpression[requestField as keyof GetTestTypeByIdQueryParams]
                ) {
                    return true;
                }

                return this.fieldInFilterExpressionMatchesTheOneInTestCode(testCode, filterExpression, field);
            });
        });
    }

    public filterTaxonomyTypes = (testTypesTaxonomy: GETTestTypeSchema[], typeOfTest?: string) => {
        return testTypesTaxonomy
            .filter((testTypes) => testTypes.typeOfTest === typeOfTest || !testTypes.typeOfTest)
            .map((testType) => {
                if (testType.nextTestTypesOrCategories) {
                    testType.nextTestTypesOrCategories = this.filterTaxonomyTypes(
                        testType.nextTestTypesOrCategories as GETTestTypeSchema[],
                        typeOfTest
                    );
                }
                return testType;
            });
    };
}

export class TestTypeUtils {
    static removeNullishValues = ({ value }: { value: unknown }) => {
        return value === 'undefined' || value === 'null' ? undefined : value;
    };

    public findTestType = ({
                               id,
                               testTypes,
                           }: { id: string; testTypes: GETTestTypeSchema[] }): GETTestTypeSchema | null => {
        for (const testType of testTypes) {
            if ('nextTestTypesOrCategories' in testType) {
                const childrenTestType: GETTestTypeSchema | null = this.findTestType({
                    id,
                    testTypes: testType.nextTestTypesOrCategories as GETTestTypeSchema[],
                });

                if (childrenTestType != null) {
                    return childrenTestType;
                }
            } else if ('id' in testType && testType.id === id) {
                return testType;
            }
        }
        return null;
    };

    public purgeTestTypes = (testTypes: GETTestTypeSchema[]) => {
        for (const testType of testTypes) {
            if ('nextTestTypesOrCategories' in testType) {
                this.purgeTestTypes(testType.nextTestTypesOrCategories as GETTestTypeSchema[]);
            } else if ('id' in testType) {
                testType.testTypeClassification = undefined;
                testType.testCodes = undefined;
            }
        }
    };

    public sortTestTypes = (testTypes: GETTestTypeSchema[]) => {
        // Pass by value
        const testTypeArray = testTypes;

        for (const testType of testTypeArray) {
            if ('nextTestTypesOrCategories' in testType) {
                Object.assign(testTypeArray, {
                    nextTestTypesOrCategories: this.sortTestTypes(testType.nextTestTypesOrCategories as GETTestTypeSchema[]),
                });
            }
        }

        return testTypeArray.sort(
            (a: { sortId: string }, b: { sortId: string }) => Number.parseInt(a.sortId, 10) - Number.parseInt(b.sortId, 10)
        );
    };
}
