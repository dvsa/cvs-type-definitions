// AUTO-GENERATED from json-definitions/v3/tech-record/put/motorcycle/complete/index.json. Do not edit by hand.

import { z } from "zod";

import { EUVehicleCategorySchema } from "./../../../enums/euVehicleCategory.enum";
import { StatusCodeSchema } from "./../../../enums/statusCode.ignore";
import { VehicleClassDescriptionSchema } from "./../../../enums/vehicleClassDescription.enum";
import { VehicleConfigurationSchema } from "./../../../enums/vehicleConfigurationLightVehicle.enum";

export const TechRecordPUTMotorcycleCompleteSchema = z.object({
  "secondaryVrms": z.array(z.string()).nullable().optional(),
  "techRecord_applicantDetails_name": z.string().nullable().optional(),
  "techRecord_applicantDetails_address1": z.string().nullable().optional(),
  "techRecord_applicantDetails_address2": z.string().nullable().optional(),
  "techRecord_applicantDetails_postTown": z.string().nullable().optional(),
  "techRecord_applicantDetails_address3": z.string().nullable().optional(),
  "techRecord_applicantDetails_postCode": z.string().nullable().optional(),
  "techRecord_applicantDetails_telephoneNumber": z.string().nullable().optional(),
  "techRecord_applicantDetails_emailAddress": z.string().nullable().optional(),
  "partialVin": z.string().nullable().optional(),
  "primaryVrm": z.string().nullable().optional(),
  "systemNumber": z.string().nullable().optional(),
  "techRecord_euVehicleCategory": z.union([z.null(), EUVehicleCategorySchema]).optional(),
  "techRecord_manufactureYear": z.number().int().nullable().optional(),
  "techRecord_recordCompleteness": z.string().nullable().optional(),
  "techRecord_noOfAxles": z.number().int(),
  "techRecord_notes": z.string().nullable().optional(),
  "techRecord_reasonForCreation": z.string(),
  "techRecord_regnDate": z.string().nullable().optional(),
  "techRecord_statusCode": StatusCodeSchema,
  "techRecord_vehicleClass_description": VehicleClassDescriptionSchema,
  "techRecord_vehicleConfiguration": VehicleConfigurationSchema,
  "techRecord_vehicleType": z.literal("motorcycle"),
  "vin": z.string(),
  "techRecord_numberOfWheelsDriven": z.number().int(),
  "techRecord_hiddenInVta": z.boolean().nullable().optional(),
  "techRecord_updateType": z.string().nullable().optional(),
}).strict();

export type TechRecordPUTMotorcycleComplete = z.infer<typeof TechRecordPUTMotorcycleCompleteSchema>;
