// AUTO-GENERATED from json-definitions/v1/vehicle-tech-record/index.json. Do not edit by hand.

import { z } from "zod";

import { TechRecordSchema } from "./../tech-record/index";

export const VehicleTechrecordSchema = z.object({
  "systemNumber": z.string(),
  "vrms": z.array(z.object({
  "vrm": z.string(),
  "isPrimary": z.boolean().optional(),
}).strict()),
  "vin": z.string(),
  "techRecord": z.array(TechRecordSchema),
  "trailerId": z.string().optional(),
}).strict();

export type VehicleTechrecordSchema = z.infer<typeof VehicleTechrecordSchema>;
