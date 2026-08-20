// AUTO-GENERATED from json-definitions/v3/tech-record/put/small trl/complete/index.json. Do not edit by hand.

import { z } from "zod";

import { EUvehiclecategorySchema } from "./../../../enums/euVehicleCategorySmallTrl.enum";
import { MonthsSchema } from "./../../../enums/manufactureMonth.ignore";
import { StatusCodeSchema } from "./../../../enums/statusCode.ignore";
import { VehicleClassDescriptionSchema } from "./../../../enums/vehicleClassDescription.enum";
import { VehicleConfigurationSchema } from "./../../../enums/vehicleConfigurationLightVehicle.enum";
import { VehicleSubclassSchema } from "./../../../enums/vehicleSubclass.ignore";

export const TechRecordPUTSmallTRLCompleteSchema = z.object({
  "techRecord_applicantDetails_address1": z.string().nullable().optional(),
  "techRecord_applicantDetails_address2": z.string().nullable().optional(),
  "techRecord_applicantDetails_address3": z.string().nullable().optional(),
  "techRecord_applicantDetails_emailAddress": z.string().nullable().optional(),
  "techRecord_applicantDetails_name": z.string().nullable().optional(),
  "techRecord_applicantDetails_postCode": z.string().nullable().optional(),
  "techRecord_applicantDetails_postTown": z.string().nullable().optional(),
  "techRecord_applicantDetails_telephoneNumber": z.string().nullable().optional(),
  "techRecord_euVehicleCategory": EUvehiclecategorySchema,
  "techRecord_manufactureMonth": z.union([MonthsSchema, z.null()]).optional(),
  "techRecord_manufactureYear": z.number().int().nullable().optional(),
  "techRecord_noOfAxles": z.number().int(),
  "techRecord_notes": z.string().nullable().optional(),
  "techRecord_reasonForCreation": z.string(),
  "techRecord_statusCode": StatusCodeSchema,
  "techRecord_vehicleClass_description": VehicleClassDescriptionSchema,
  "techRecord_vehicleConfiguration": VehicleConfigurationSchema,
  "techRecord_vehicleSubclass": z.union([z.null(), VehicleSubclassSchema]).optional(),
  "techRecord_vehicleType": z.literal("trl"),
  "vin": z.string(),
  "trailerId": z.string().optional(),
  "techRecord_hiddenInVta": z.boolean().nullable().optional(),
}).strict();

export type TechRecordPUTSmallTRLComplete = z.infer<typeof TechRecordPUTSmallTRLCompleteSchema>;
