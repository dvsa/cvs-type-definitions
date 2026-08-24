// AUTO-GENERATED from json-definitions/enums/defectLocation/horizontal.enum.json. Do not edit by hand.

import { z } from "zod";

export const HorizontalLocation = {
	"INNER": "inner",
	"OUTER": "outer",
} as const;

export type HorizontalLocation = (typeof HorizontalLocation)[keyof typeof HorizontalLocation];

export const HorizontalLocationSchema = z.enum(HorizontalLocation);
