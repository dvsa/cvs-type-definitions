// AUTO-GENERATED from json-definitions/test-type/enums/testTypeClassification.enum.json. Do not edit by hand.

import { z } from "zod";

export const TestTypeClassification = {
	"ANNUAL_NO_CERTIFICATE": "Annual NO CERTIFICATE",
	"ANNUAL_WITH_CERTIFICATE": "Annual With Certificate",
	"NON_ANNUAL": "NON ANNUAL",
	"IVA_WITH_CERTIFICATE": "IVA With Certificate",
	"MSVA_WITH_CERTIFICATE": "MSVA With Certificate",
} as const;

export type TestTypeClassification = (typeof TestTypeClassification)[keyof typeof TestTypeClassification];

export const TestTypeClassificationSchema = z.enum(TestTypeClassification);
