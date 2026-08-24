// AUTO-GENERATED from json-definitions/v1/axle/index.ignore.json. Do not edit by hand.

import { z } from "zod";

import { WeightsSchema } from "./../weights/index.ignore";
import { TyresSchema } from "./../tyres/index.ignore";
import { AxleBrakePropertiesSchema } from "./../axle-brake-properties/index.ignore";

export const AxleSchema = z.object({
  "parkingBrakeMrk": z.boolean().optional(),
  "axleNumber": z.number().int(),
  "weights": WeightsSchema.optional(),
  "tyres": TyresSchema,
  "brakes": AxleBrakePropertiesSchema.optional(),
}).strict();

export type AxleSchema = z.infer<typeof AxleSchema>;
