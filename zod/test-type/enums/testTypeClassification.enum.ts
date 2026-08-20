// AUTO-GENERATED from json-definitions/test-type/enums/testTypeClassification.enum.json. Do not edit by hand.

import { z } from "zod";

export enum TestTypeClassification {
  "ANNUAL_NO_CERTIFICATE" = "Annual NO CERTIFICATE",
  "ANNUAL_WITH_CERTIFICATE" = "Annual With Certificate",
  "NON_ANNUAL" = "NON ANNUAL",
  "IVA_WITH_CERTIFICATE" = "IVA With Certificate",
  "MSVA_WITH_CERTIFICATE" = "MSVA With Certificate",
}

export const TestTypeClassificationSchema = z.enum(TestTypeClassification);
