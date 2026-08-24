// AUTO-GENERATED from json-definitions/v1/enums/testStatus.enum.json. Do not edit by hand.

import { z } from "zod";

export const TestStatus = {
	"SUBMITTED": "submitted",
	"CANCELLED": "cancelled",
} as const;

export type TestStatus = (typeof TestStatus)[keyof typeof TestStatus];

export const TestStatusSchema = z.enum(TestStatus);
