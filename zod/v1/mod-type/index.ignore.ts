// AUTO-GENERATED from json-definitions/v1/mod-type/index.ignore.json. Do not edit by hand.

import { z } from "zod";

export const ModTypeSchema = z.object({
  "code": z.string(),
  "description": z.string(),
}).strict();

export type ModTypeSchema = z.infer<typeof ModTypeSchema>;
