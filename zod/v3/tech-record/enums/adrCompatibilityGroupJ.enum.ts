// AUTO-GENERATED from json-definitions/v3/tech-record/enums/adrCompatibilityGroupJ.enum.json. Do not edit by hand.

import { z } from "zod";

export const ADRCompatibilityGroupJ = {
	"I": "I",
	"E": "E",
} as const;

export type ADRCompatibilityGroupJ = (typeof ADRCompatibilityGroupJ)[keyof typeof ADRCompatibilityGroupJ];

export const ADRCompatibilityGroupJSchema = z.enum(ADRCompatibilityGroupJ);
