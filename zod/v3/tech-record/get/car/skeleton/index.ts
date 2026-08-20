// AUTO-GENERATED from json-definitions/v3/tech-record/get/car/skeleton/index.json. Do not edit by hand.

import { z } from "zod";

import { EUvehiclecategorySchema } from "./../../../enums/euVehicleCategoryCar.enum";
import { StatusCodeSchema } from "./../../../enums/statusCode.ignore";
import { VehicleConfigurationSchema } from "./../../../enums/vehicleConfigurationLightVehicle.enum";
import { VehicleSubclassSchema } from "./../../../enums/vehicleSubclass.ignore";

export const TechRecordGETCarSkeletonSchema = z.object({
  "techRecord_applicantDetails_name": z.string().nullable().optional(),
  "techRecord_applicantDetails_address1": z.string().nullable().optional(),
  "techRecord_applicantDetails_address2": z.string().nullable().optional(),
  "techRecord_applicantDetails_postTown": z.string().nullable().optional(),
  "techRecord_applicantDetails_address3": z.string().nullable().optional(),
  "techRecord_applicantDetails_postCode": z.string().nullable().optional(),
  "techRecord_applicantDetails_telephoneNumber": z.string().nullable().optional(),
  "techRecord_applicantDetails_emailAddress": z.string().nullable().optional(),
  "createdTimestamp": z.string(),
  "partialVin": z.string().nullable().optional(),
  "primaryVrm": z.string(),
  "systemNumber": z.string(),
  "techRecord_createdAt": z.string(),
  "techRecord_createdById": z.string(),
  "techRecord_createdByName": z.string(),
  "techRecord_euVehicleCategory": z.union([z.null(), EUvehiclecategorySchema]).optional(),
  "techRecord_lastUpdatedAt": z.string().nullable().optional(),
  "techRecord_lastUpdatedById": z.string().nullable().optional(),
  "techRecord_lastUpdatedByName": z.string().nullable().optional(),
  "techRecord_manufactureYear": z.number().int().nullable().optional(),
  "techRecord_recordCompleteness": z.literal("skeleton").optional(),
  "techRecord_noOfAxles": z.number().int().nullable().optional(),
  "techRecord_notes": z.string().nullable().optional(),
  "techRecord_reasonForCreation": z.string().optional(),
  "techRecord_regnDate": z.string().nullable().optional(),
  "techRecord_statusCode": z.union([z.null(), StatusCodeSchema]).optional(),
  "techRecord_vehicleConfiguration": z.union([z.null(), VehicleConfigurationSchema]).optional(),
  "techRecord_vehicleType": z.literal("car"),
  "vin": z.string(),
  "techRecord_hiddenInVta": z.boolean().nullable().optional(),
  "techRecord_updateType": z.string().nullable().optional(),
  "secondaryVrms": z.array(z.string()).nullable().optional(),
  "techRecord_vehicleSubclass": VehicleSubclassSchema.optional(),
}).strict();

export type TechRecordGETCarSkeleton = z.infer<typeof TechRecordGETCarSkeletonSchema>;
