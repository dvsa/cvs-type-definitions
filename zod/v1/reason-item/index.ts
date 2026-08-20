// AUTO-GENERATED from json-definitions/v1/reason-item/index.json. Do not edit by hand.

import { z } from "zod";

export const ReasonItemSchema = z.object({
  "text": z.string(),
  "isChecked": z.boolean(),
}).strict();

export type ReasonItemSchema = z.infer<typeof ReasonItemSchema>;
