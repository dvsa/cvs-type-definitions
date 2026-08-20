// AUTO-GENERATED from json-definitions/v1/recalls/index.json. Do not edit by hand.

import { z } from "zod";

export const RecallsSchema = z.object({
  "hasRecall": z.boolean(),
  "manufacturer": z.string().nullable(),
}).strict();

export type RecallsSchema = z.infer<typeof RecallsSchema>;
