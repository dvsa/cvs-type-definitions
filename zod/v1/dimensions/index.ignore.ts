// AUTO-GENERATED from json-definitions/v1/dimensions/index.ignore.json. Do not edit by hand.

import { z } from "zod";

export const DimensionsSchema = z.object({
  "length": z.number().int(),
  "width": z.number().int(),
  "axleSpacing": z.array(z.unknown()),
}).strict();

export type DimensionsSchema = z.infer<typeof DimensionsSchema>;
