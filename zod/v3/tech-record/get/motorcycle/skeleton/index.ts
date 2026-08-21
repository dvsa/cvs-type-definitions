// AUTO-GENERATED from json-definitions/v3/tech-record/get/motorcycle/skeleton/index.json. Do not edit by hand.

import { z } from "zod";

import { EUVehicleCategorySchema } from "./../../../enums/euVehicleCategory.enum";
import { StatusCodeSchema } from "./../../../enums/statusCode.ignore";
import { VehicleClassDescriptionSchema } from "./../../../enums/vehicleClassDescription.enum";
import { VehicleConfigurationSchema } from "./../../../enums/vehicleConfigurationLightVehicle.enum";

export const TechRecordGETMotorcycleSkeletonSchema = z.object({
  "techRecord_applicantDetails_name": z.string().nullable().optional(),
  "techRecord_applicantDetails_address1": z.string().nullable().optional(),
  "techRecord_applicantDetails_address2": z.string().nullable().optional(),
  "techRecord_applicantDetails_postTown": z.string().nullable().optional(),
  "techRecord_applicantDetails_address3": z.string().nullable().optional(),
  "techRecord_applicantDetails_postCode": z.string().nullable().optional(),
  "techRecord_applicantDetails_telephoneNumber": z.string().nullable().optional(),
  "techRecord_applicantDetails_emailAddress": z.string().nullable().optional(),
  "createdTimestamp": z.string(),
  "partialVin": z.string(),
  "primaryVrm": z.string(),
  "systemNumber": z.string(),
  "techRecord_createdAt": z.string().nullable(),
  "techRecord_createdById": z.string().nullable(),
  "techRecord_createdByName": z.string().nullable(),
  "techRecord_euVehicleCategory": z.union([z.null(), EUVehicleCategorySchema]).optional(),
  "techRecord_lastUpdatedAt": z.string().nullable().optional(),
  "techRecord_lastUpdatedById": z.string().nullable().optional(),
  "techRecord_lastUpdatedByName": z.string().nullable().optional(),
  "techRecord_manufactureYear": z.number().int().nullable().optional(),
  "techRecord_recordCompleteness": z.string().nullable().optional(),
  "techRecord_noOfAxles": z.number().int().nullable().optional(),
  "techRecord_notes": z.string().nullable().optional(),
  "techRecord_reasonForCreation": z.string(),
  "techRecord_regnDate": z.string().nullable().optional(),
  "techRecord_statusCode": z.union([z.null(), StatusCodeSchema]).optional(),
  "techRecord_vehicleClass_description": VehicleClassDescriptionSchema,
  "techRecord_vehicleClass_code": z.string(),
  "techRecord_vehicleConfiguration": z.union([z.null(), VehicleConfigurationSchema]).optional(),
  "techRecord_vehicleType": z.literal("motorcycle"),
  "vin": z.string(),
  "techRecord_hiddenInVta": z.boolean().nullable().optional(),
  "techRecord_updateType": z.string().nullable().optional(),
  "secondaryVrms": z.array(z.string()).nullable().optional(),
  "techRecord_numberOfWheelsDriven": z.number().int().nullable().optional(),
}).strict();

export type TechRecordGETMotorcycleSkeleton = z.infer<typeof TechRecordGETMotorcycleSkeletonSchema>;
