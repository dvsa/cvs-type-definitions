// AUTO-GENERATED from json-definitions/v1/axle-brake-properties/index.ignore.json. Do not edit by hand.

import { z } from "zod";

export const AxleBrakePropertiesSchema = z.object({
  "brakeActuator": z.number().int(),
  "leverLength": z.number().int(),
  "springBrakeParking": z.boolean(),
}).strict();

export type AxleBrakePropertiesSchema = z.infer<typeof AxleBrakePropertiesSchema>;
