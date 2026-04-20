export {
    getTestTypeSchema,
    testCodeResponseSchema,
    type GETTestTypeSchema,
    type TestCodeSchema,
} from './get';

// NextTestTypesOrCategorySchema and NextTestTypesOrCategorySchema1 are the same recursive type as GETTestTypeSchema
export { type GETTestTypeSchema as NextTestTypesOrCategorySchema } from './get';
export { type GETTestTypeSchema as NextTestTypesOrCategorySchema1 } from './get';

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
} from '../../database/enums';
