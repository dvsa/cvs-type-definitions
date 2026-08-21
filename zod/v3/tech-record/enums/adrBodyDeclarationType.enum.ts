// AUTO-GENERATED from json-definitions/v3/tech-record/enums/adrBodyDeclarationType.enum.json. Do not edit by hand.

import { z } from "zod";

export const ADRBodyDeclarationTypes = {
	"PRE_1ST_JULY_2005": "Pre 1st July 2005",
	"ON_OR_AFTER_1ST_JULY_2005": "On or after 1st July 2005",
	"UNKNOWN": "Unknown",
} as const;

export type ADRBodyDeclarationTypes = (typeof ADRBodyDeclarationTypes)[keyof typeof ADRBodyDeclarationTypes];

export const ADRBodyDeclarationTypesSchema = z.enum(ADRBodyDeclarationTypes);
