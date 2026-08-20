// AUTO-GENERATED from json-definitions/v3/tech-record/put/car/complete/index.json. Do not edit by hand.

import { z } from "zod";

import { StatusCodeSchema } from "./../../../enums/statusCode.ignore";
import { VehicleSubclassSchema } from "./../../../enums/vehicleSubclass.ignore";
import { VehicleConfigurationSchema } from "./../../../enums/vehicleConfigurationLightVehicle.enum";
import { EUvehiclecategorySchema } from "./../../../enums/euVehicleCategoryCar.enum";

export const TechRecordPUTCarCompleteSchema = z.object({
  "vin": z.string(),
  "primaryVrm": z.string().nullable().optional(),
  "techRecord_reasonForCreation": z.string(),
  "techRecord_vehicleType": z.literal("car"),
  "techRecord_statusCode": StatusCodeSchema,
  "techRecord_regnDate": z.string().nullable().optional(),
  "techRecord_manufactureYear": z.number().int().nullable().optional(),
  "techRecord_noOfAxles": z.number().int(),
  "techRecord_notes": z.string().optional(),
  "techRecord_vehicleSubclass": VehicleSubclassSchema,
  "techRecord_hiddenInVta": z.boolean().nullable().optional(),
  "techRecord_updateType": z.string().nullable().optional(),
  "secondaryVrms": z.array(z.string()).nullable().optional(),
  "techRecord_vehicleConfiguration": VehicleConfigurationSchema,
  "techRecord_euVehicleCategory": z.union([EUvehiclecategorySchema, z.null()]).optional(),
  "techRecord_applicantDetails_name": z.string().nullable().optional(),
  "techRecord_applicantDetails_address1": z.string().nullable().optional(),
  "techRecord_applicantDetails_address2": z.string().nullable().optional(),
  "techRecord_applicantDetails_postTown": z.string().nullable().optional(),
  "techRecord_applicantDetails_address3": z.string().nullable().optional(),
  "techRecord_applicantDetails_postCode": z.string().nullable().optional(),
  "techRecord_applicantDetails_telephoneNumber": z.string().nullable().optional(),
  "techRecord_applicantDetails_emailAddress": z.string().nullable().optional(),
}).strict();

export type TechRecordPUTCarComplete = z.infer<typeof TechRecordPUTCarCompleteSchema>;
