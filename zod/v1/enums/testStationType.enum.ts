// AUTO-GENERATED from json-definitions/v1/enums/testStationType.enum.json. Do not edit by hand.

import { z } from "zod";

export const TestStationTypes = {
	"ATF": "atf",
	"GVTS": "gvts",
	"HQ": "hq",
	"POTF": "potf",
	"VEF": "vef",
} as const;

export type TestStationTypes = (typeof TestStationTypes)[keyof typeof TestStationTypes];

export const TestStationTypesSchema = z.enum(TestStationTypes);
