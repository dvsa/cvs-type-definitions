// AUTO-GENERATED from json-definitions/v3/tech-record/put/car/skeleton/index.json. Do not edit by hand.

import { z } from "zod";

import { StatusCodeSchema } from "./../../../enums/statusCode.ignore";
import { VehicleSubclassSchema } from "./../../../enums/vehicleSubclass.ignore";
import { VehicleConfigurationSchema } from "./../../../enums/vehicleConfigurationLightVehicle.enum";
import { EUVehicleCategorySchema } from "./../../../enums/euVehicleCategoryCar.enum";

export const TechRecordPUTCarSkeletonSchema = z.object({
  "vin": z.string(),
  "primaryVrm": z.string().optional(),
  "techRecord_reasonForCreation": z.string(),
  "techRecord_vehicleType": z.literal("car"),
  "techRecord_statusCode": StatusCodeSchema,
  "techRecord_regnDate": z.string().nullable().optional(),
  "techRecord_manufactureYear": z.number().int().nullable().optional(),
  "techRecord_noOfAxles": z.number().int().nullable().optional(),
  "techRecord_notes": z.string().nullable().optional(),
  "techRecord_hiddenInVta": z.boolean().nullable().optional(),
  "techRecord_updateType": z.string().nullable().optional(),
  "secondaryVrms": z.array(z.string()).nullable().optional(),
  "techRecord_vehicleSubclass": VehicleSubclassSchema.optional(),
  "techRecord_vehicleConfiguration": z.union([z.null(), VehicleConfigurationSchema]).optional(),
  "techRecord_euVehicleCategory": z.union([EUVehicleCategorySchema, z.null()]).optional(),
  "techRecord_applicantDetails_name": z.string().nullable().optional(),
  "techRecord_applicantDetails_address1": z.string().nullable().optional(),
  "techRecord_applicantDetails_address2": z.string().nullable().optional(),
  "techRecord_applicantDetails_postTown": z.string().nullable().optional(),
  "techRecord_applicantDetails_address3": z.string().nullable().optional(),
  "techRecord_applicantDetails_postCode": z.string().nullable().optional(),
  "techRecord_applicantDetails_telephoneNumber": z.string().nullable().optional(),
  "techRecord_applicantDetails_emailAddress": z.string().nullable().optional(),
}).strict();

export type TechRecordPUTCarSkeleton = z.infer<typeof TechRecordPUTCarSkeletonSchema>;
