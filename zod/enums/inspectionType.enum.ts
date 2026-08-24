// AUTO-GENERATED from json-definitions/enums/inspectionType.enum.json. Do not edit by hand.

import { z } from "zod";

export const InspectionType = {
	"BASIC": "basic",
	"NORMAL": "normal",
} as const;

export type InspectionType = (typeof InspectionType)[keyof typeof InspectionType];

export const InspectionTypeSchema = z.enum(InspectionType);
