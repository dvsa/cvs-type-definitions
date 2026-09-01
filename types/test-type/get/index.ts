import { z } from 'zod';
import {
    euVehicleCategoryEnum,
    testTypeClassificationEnum,
    vehicleConfigurationEnum,
    vehicleSizeEnum,
    vehicleSubclassEnum,
    vehicleTypeEnum,
} from '../../../database/enums';

export {
    vehicleTypeEnum,
    type VehicleType,
    vehicleSizeEnum,
    type VehicleSize,
    vehicleConfigurationEnum,
    type VehicleConfiguration,
    euVehicleCategoryEnum,
    type EUVehicleCategory,
    vehicleSubclassEnum,
    type VehicleSubclass,
    testTypeClassificationEnum,
    type TestTypeClassification,
} from '../../../database/enums';

export const testCodeResponseSchema = z.object({
    forVehicleType: z.union([vehicleTypeEnum, z.array(vehicleTypeEnum)]),
    forVehicleSize: vehicleSizeEnum.nullable(),
    forVehicleConfiguration: vehicleConfigurationEnum.nullable(),
    forVehicleAxles: z.union([z.number(), z.array(z.number())]).nullable(),
    forEuVehicleCategory: z.union([euVehicleCategoryEnum, z.array(euVehicleCategoryEnum)]).nullable(),
    forVehicleClass: z.union([z.string(), z.array(z.string())]).nullable(),
    forVehicleSubclass: z.union([vehicleSubclassEnum, z.array(vehicleSubclassEnum)]).nullable(),
    forVehicleWheels: z.union([z.number(), z.array(z.number())]).nullable(),
    defaultTestCode: z.string(),
    linkedTestCode: z.string().nullable(),
    forProvisionalStatus: z.boolean().optional(),
    forProvisionalStatusOnly: z.boolean().optional(),
});

export type TestCodeSchema = z.infer<typeof testCodeResponseSchema>;

export const getByIdResponseSchema = z.object({
    id: z.string(),
    defaultTestCode: z.string().optional(),
    linkedTestCode: z.string().optional(),
    testTypeClassification: z.string().optional(),
    name: z.string().optional(),
    testTypeName: z.string().optional(),
});

export type GetByIdResponseModel = z.infer<typeof getByIdResponseSchema>;

// Recursive type needs a lazy definition
const baseTestTypeFields = {
    id: z.string(),
    sortId: z.string(),
    linkedIds: z.array(z.string()).nullable(),
    suggestedTestTypeIds: z.array(z.string()).optional(),
    name: z.string(),
    testTypeName: z.string().optional(),
    typeOfTest: z.string().optional(),
    suggestedTestTypeDisplayName: z.string().optional(),
    suggestedTestTypeDisplayOrder: z.string().optional(),
    forVehicleType: z.array(vehicleTypeEnum),
    forProvisionalStatus: z.boolean().optional(),
    forProvisionalStatusOnly: z.boolean().optional(),
    forVehicleSize: z.array(vehicleSizeEnum).nullable(),
    forVehicleConfiguration: z.array(vehicleConfigurationEnum).nullable(),
    forVehicleAxles: z.array(z.number()).nullable(),
    forEuVehicleCategory: z.array(euVehicleCategoryEnum).nullable(),
    forVehicleClass: z.array(z.string()).nullable(),
    forVehicleSubclass: z.array(vehicleSubclassEnum).nullable(),
    forVehicleWheels: z.array(z.number()).nullable(),
    testTypeClassification: testTypeClassificationEnum.optional(),
    testCodes: z.array(testCodeResponseSchema).optional(),
};

const baseTestTypeObject = z.object(baseTestTypeFields);

export interface GETTestTypeSchema extends z.infer<typeof baseTestTypeObject> {
    nextTestTypesOrCategories?: GETTestTypeSchema[];
}

export const getTestTypeSchema: z.ZodType<GETTestTypeSchema> = z.lazy(() =>
    baseTestTypeObject.extend({
        nextTestTypesOrCategories: z.array(getTestTypeSchema).optional(),
    }),
);

// NextTestTypesOrCategorySchema is the same recursive type as GETTestTypeSchema
export type NextTestTypesOrCategorySchema = GETTestTypeSchema;
