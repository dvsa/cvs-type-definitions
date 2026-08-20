// AUTO-GENERATED from json-definitions/v3/tech-record/get/search/index.json. Do not edit by hand.

import { z } from "zod";

import { StatusCodeSchema } from "./../../enums/statusCode.ignore";
import { VehicleTypeSchema } from "./../../enums/vehicleType.ignore";

export const TechRecordSearchSchema = z.object({
  "primaryVrm": z.string().optional(),
  "vin": z.string(),
  "techRecord_statusCode": StatusCodeSchema,
  "techRecord_vehicleType": VehicleTypeSchema,
  "createdTimestamp": z.string(),
  "trailerId": z.string().optional(),
  "systemNumber": z.string(),
  "techRecord_chassisMake": z.string().nullable().optional(),
  "techRecord_chassisModel": z.string().nullable().optional(),
  "techRecord_make": z.string().nullable().optional(),
  "techRecord_model": z.string().nullable().optional(),
  "techRecord_manufactureYear": z.number().int().nullable(),
  "techRecord_reasonForCreation": z.string().optional(),
  "techRecord_createdByName": z.string().optional(),
  "techRecord_applicantDetails_emailAddress": z.string().nullable().optional(),
}).strict();

export type TechRecordSearchSchema = z.infer<typeof TechRecordSearchSchema>;
