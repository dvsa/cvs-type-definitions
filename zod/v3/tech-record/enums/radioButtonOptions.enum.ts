// AUTO-GENERATED from json-definitions/v3/tech-record/enums/radioButtonOptions.enum.json. Do not edit by hand.

import { z } from "zod";

export const RadioButtonOptions = {
	"yes": "yes",
	"no": "no",
	"not_applicable": "n/a",
} as const;

export type RadioButtonOptions = (typeof RadioButtonOptions)[keyof typeof RadioButtonOptions];

export const RadioButtonOptionsSchema = z.enum(RadioButtonOptions);
