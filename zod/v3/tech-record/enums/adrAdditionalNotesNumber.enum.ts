// AUTO-GENERATED from json-definitions/v3/tech-record/enums/adrAdditionalNotesNumber.enum.json. Do not edit by hand.

import { z } from "zod";

export const ADRAdditionalNotesNumber = {
	"ONE": "1",
	"ONE_A": "1A",
	"TWO": "2",
	"THREE": "3",
	"V1B": "V1B",
	"T1B": "T1B",
} as const;

export type ADRAdditionalNotesNumber = (typeof ADRAdditionalNotesNumber)[keyof typeof ADRAdditionalNotesNumber];

export const ADRAdditionalNotesNumberSchema = z.enum(ADRAdditionalNotesNumber);
