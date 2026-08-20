// AUTO-GENERATED from json-definitions/v3/tech-record/enums/paragraphId.ignore.json. Do not edit by hand.

import { z } from "zod";

export const ParagraphIdsSchema = z.union([z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7)]);

export type ParagraphIds = z.infer<typeof ParagraphIdsSchema>;
