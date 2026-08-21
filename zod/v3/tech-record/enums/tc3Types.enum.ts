// AUTO-GENERATED from json-definitions/v3/tech-record/enums/tc3Types.enum.json. Do not edit by hand.

import { z } from "zod";

export const TC3Types = {
	"INTERMEDIATE": "intermediate",
	"PERIODIC": "periodic",
	"EXCEPTIONAL": "exceptional",
} as const;

export type TC3Types = (typeof TC3Types)[keyof typeof TC3Types];

export const TC3TypesSchema = z.enum(TC3Types);
