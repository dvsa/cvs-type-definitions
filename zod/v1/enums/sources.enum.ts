// AUTO-GENERATED from json-definitions/v1/enums/sources.enum.json. Do not edit by hand.

import { z } from "zod";

export const TestSources = {
	"VTM": "vtm",
	"VTA": "vta",
} as const;

export type TestSources = (typeof TestSources)[keyof typeof TestSources];

export const TestSourcesSchema = z.enum(TestSources);
