// AUTO-GENERATED from json-definitions/v1/media/failReason.json. Do not edit by hand.

import { z } from "zod";

export const FailReasonSchema = z.object({
  "type": z.literal("failReason"),
  "path": z.string(),
  "reason": z.string(),
}).strict();

export type FailReasonSchema = z.infer<typeof FailReasonSchema>;
