// AUTO-GENERATED from json-definitions/test-type/testCode.json. Do not edit by hand.

import { z } from "zod";

import { VehicleTypeSchema } from "./../enums/vehicleType.enum";
import { VehicleSizeSchema } from "./../enums/vehicleSize.enum";
import { VehicleConfigurationSchema } from "./../enums/vehicleConfiguration.enum";
import { EUVehicleCategorySchema } from "./../enums/euVehicleCategory.enum";
import { VehicleSubclassSchema } from "./../enums/vehicleSubclass.enum";

export const TestCodeSchema = z.object({
  "forVehicleType": z.union([VehicleTypeSchema, z.array(VehicleTypeSchema)]),
  "forVehicleSize": z.union([VehicleSizeSchema, z.null()]),
  "forVehicleConfiguration": z.union([VehicleConfigurationSchema, z.null()]),
  "forVehicleAxles": z.union([z.number().int(), z.array(z.number().int()), z.null()]),
  "forEuVehicleCategory": z.union([EUVehicleCategorySchema, z.array(EUVehicleCategorySchema), z.null()]),
  "forVehicleClass": z.union([z.string(), z.array(z.string()), z.null()]),
  "forVehicleSubclass": z.union([VehicleSubclassSchema, z.array(VehicleSubclassSchema), z.null()]),
  "forVehicleWheels": z.union([z.number().int(), z.array(z.number().int()), z.null()]),
  "defaultTestCode": z.string(),
  "linkedTestCode": z.string().nullable(),
  "forProvisionalStatus": z.boolean().optional(),
  "forProvisionalStatusOnly": z.boolean().optional(),
}).strict();

export type TestCodeSchema = z.infer<typeof TestCodeSchema>;
