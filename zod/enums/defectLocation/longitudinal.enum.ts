// AUTO-GENERATED from json-definitions/enums/defectLocation/longitudinal.enum.json. Do not edit by hand.

import { z } from "zod";

export const LongitudinalLocation = {
	"FRONT": "front",
	"REAR": "rear",
} as const;

export type LongitudinalLocation = (typeof LongitudinalLocation)[keyof typeof LongitudinalLocation];

export const LongitudinalLocationSchema = z.enum(LongitudinalLocation);
