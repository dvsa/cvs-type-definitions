// AUTO-GENERATED from json-definitions/v1/weights/index.ignore.json. Do not edit by hand.

import { z } from "zod";

export const WeightsSchema = z.object({
  "kerbWeight": z.number().int().optional(),
  "ladenWeight": z.number().int().optional(),
  "gbWeight": z.number().int(),
  "designWeight": z.number().int(),
}).strict();

export type WeightsSchema = z.infer<typeof WeightsSchema>;
