// AUTO-GENERATED from json-definitions/enums/defectLocation/vertical.enum.json. Do not edit by hand.

import { z } from "zod";

export const VerticalLocation = {
	"UPPER": "upper",
	"LOWER": "lower",
} as const;

export type VerticalLocation = (typeof VerticalLocation)[keyof typeof VerticalLocation];

export const VerticalLocationSchema = z.enum(VerticalLocation);
