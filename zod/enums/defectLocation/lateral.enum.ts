// AUTO-GENERATED from json-definitions/enums/defectLocation/lateral.enum.json. Do not edit by hand.

import { z } from "zod";

export const LateralLocation = {
	"NEARSIDE": "nearside",
	"CENTRE": "centre",
	"OFFSIDE": "offside",
} as const;

export type LateralLocation = (typeof LateralLocation)[keyof typeof LateralLocation];

export const LateralLocationSchema = z.enum(LateralLocation);
