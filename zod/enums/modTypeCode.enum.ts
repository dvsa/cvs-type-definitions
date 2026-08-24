// AUTO-GENERATED from json-definitions/enums/modTypeCode.enum.json. Do not edit by hand.

import { z } from "zod";

export const ModTypeCode = {
	"P": "p",
	"M": "m",
	"G": "g",
} as const;

export type ModTypeCode = (typeof ModTypeCode)[keyof typeof ModTypeCode];

export const ModTypeCodeSchema = z.enum(ModTypeCode);
