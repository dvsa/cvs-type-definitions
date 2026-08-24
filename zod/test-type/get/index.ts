// AUTO-GENERATED from json-definitions/test-type/get/index.json. Do not edit by hand.

import { z } from "zod";

import { VehicleTypeSchema } from "./../../enums/vehicleType.enum";
import { VehicleSizeSchema } from "./../../enums/vehicleSize.enum";
import { VehicleConfigurationSchema } from "./../../enums/vehicleConfiguration.enum";
import { EUVehicleCategorySchema } from "./../../enums/euVehicleCategory.enum";
import { VehicleSubclassSchema } from "./../../enums/vehicleSubclass.enum";
import { TestTypeClassificationSchema } from "./../enums/testTypeClassification.enum";
import { TestCodeSchema } from "./../testCode";
import { NextTestTypesOrCategorySchema } from "./../nextTestTypesOrCategory";

export const GETTestTypeSchema = z.object({
  "typeOfTest": z.string().optional(),
  "id": z.string(),
  "sortId": z.string(),
  "linkedIds": z.array(z.string()).nullable(),
  "suggestedTestTypeIds": z.array(z.string()).optional(),
  "name": z.string(),
  "testTypeName": z.string().optional(),
  "suggestedTestTypeDisplayName": z.string().optional(),
  "suggestedTestTypeDisplayOrder": z.string().optional(),
  "forVehicleType": z.array(VehicleTypeSchema),
  "forProvisionalStatus": z.boolean().optional(),
  "forProvisionalStatusOnly": z.boolean().optional(),
  "forVehicleSize": z.array(VehicleSizeSchema).nullable(),
  "forVehicleConfiguration": z.array(VehicleConfigurationSchema).nullable(),
  "forVehicleAxles": z.array(z.number().int()).nullable(),
  "forEuVehicleCategory": z.array(EUVehicleCategorySchema).nullable(),
  "forVehicleClass": z.array(z.string()).nullable(),
  "forVehicleSubclass": z.array(VehicleSubclassSchema).nullable(),
  "forVehicleWheels": z.array(z.number().int()).nullable(),
  "testTypeClassification": TestTypeClassificationSchema.optional(),
  "testCodes": z.array(TestCodeSchema).optional(),
  "nextTestTypesOrCategories": z.array(NextTestTypesOrCategorySchema).optional(),
}).strict();

export type GETTestTypeSchema = z.infer<typeof GETTestTypeSchema>;
