// AUTO-GENERATED from json-definitions/v1/tank/index.ignore.json. Do not edit by hand.

import { z } from "zod";

import { TankDetailsSchema } from "./tank-details/index.ignore";
import { TankStatementSchema } from "./tank-statement/index.ignore";

export const TankSchema = z.object({
  "tankDetails": TankDetailsSchema.optional(),
  "tankStatement": TankStatementSchema.optional(),
}).strict();

export type TankSchema = z.infer<typeof TankSchema>;
