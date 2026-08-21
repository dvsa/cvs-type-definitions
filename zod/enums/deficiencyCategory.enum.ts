// AUTO-GENERATED from json-definitions/enums/deficiencyCategory.enum.json. Do not edit by hand.

import { z } from "zod";

export const DeficiencyCategory = {
	"ADVISORY": "advisory",
	"DANGEROUS": "dangerous",
	"MAJOR": "major",
	"MINOR": "minor",
} as const;

export type DeficiencyCategory = (typeof DeficiencyCategory)[keyof typeof DeficiencyCategory];

export const DeficiencyCategorySchema = z.enum(DeficiencyCategory);
