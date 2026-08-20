// AUTO-GENERATED from json-definitions/v1/brake-force-wheel/index.ignore.json. Do not edit by hand.

import { z } from "zod";

export const BrakeForceWheelSchema = z.object({
  "serviceBrakeForce": z.number().int(),
  "secondaryBrakeForce": z.number().int(),
  "parkingBrakeForce": z.number().int(),
}).strict();

export type BrakeForceWheel = z.infer<typeof BrakeForceWheelSchema>;
