// AUTO-GENERATED from json-definitions/v3/tech-record/enums/letterType.ignore.json. Do not edit by hand.

import { z } from "zod";

export const LetterTypesSchema = z.enum(["trailer acceptance","trailer rejection"]);

export type LetterTypes = z.infer<typeof LetterTypesSchema>;
