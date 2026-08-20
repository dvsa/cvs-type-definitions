// AUTO-GENERATED from json-definitions/v3/tech-record/enums/recordCompleteness.ignore.json. Do not edit by hand.

import { z } from "zod";

export const RecordCompletenessSchema = z.enum(["complete","testable","skeleton"]);

export type RecordCompleteness = z.infer<typeof RecordCompletenessSchema>;
