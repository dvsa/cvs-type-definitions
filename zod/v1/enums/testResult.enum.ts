// AUTO-GENERATED from json-definitions/v1/enums/testResult.enum.json. Do not edit by hand.

import { z } from "zod";

export const TestResults = {
	"PASS": "pass",
	"PRS": "prs",
	"FAIL": "fail",
	"ABANDONED": "abandoned",
} as const;

export type TestResults = (typeof TestResults)[keyof typeof TestResults];

export const TestResultsSchema = z.enum(TestResults);
