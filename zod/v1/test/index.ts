// AUTO-GENERATED from json-definitions/v1/test/index.json. Do not edit by hand.

import { z } from "zod";

import { VehicleSchema } from "./../vehicle/index";

export const CommercialVehicleTestSchema = z.object({
  "testResultId": z.string().optional(),
  "startTime": z.string(),
  "endTime": z.string(),
  "status": z.union([z.literal("submitted"), z.literal("cancelled"), z.literal(null)]),
  "reasonForCancellation": z.string(),
  "vehicles": z.array(VehicleSchema),
}).strict();

export type CommercialVehicleTestSchema = z.infer<typeof CommercialVehicleTestSchema>;
