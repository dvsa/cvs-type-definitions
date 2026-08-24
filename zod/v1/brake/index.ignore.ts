// AUTO-GENERATED from json-definitions/v1/brake/index.ignore.json. Do not edit by hand.

import { z } from "zod";

import { BrakeForceWheelSchema } from "./../brake-force-wheel/index.ignore";

export const BrakeSchema = z.object({
  "brakeCode": z.string().optional(),
  "dataTrBrakeOne": z.string().optional(),
  "dataTrBrakeTwo": z.string().optional(),
  "dataTrBrakeThree": z.string().optional(),
  "retarderBrakeOne": z.string().optional(),
  "retarderBrakeTwo": z.string().optional(),
  "brakeCodeOriginal": z.string().optional(),
  "brakeForceWheelsNotLocked": BrakeForceWheelSchema.optional(),
  "brakeForceWheelsUpToHalfLocked": BrakeForceWheelSchema.optional(),
  "dtpNumber": z.string().optional(),
  "loadSensingValve": z.boolean().optional(),
  "antilockBrakingSystem": z.boolean().optional(),
}).strict();

export type Brake = z.infer<typeof BrakeSchema>;
