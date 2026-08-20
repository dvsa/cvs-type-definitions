// AUTO-GENERATED from json-definitions/v1/enums/testResult.enum.json. Do not edit by hand.

import { z } from "zod";

export enum TestResults {
  "PASS" = "pass",
  "PRS" = "prs",
  "FAIL" = "fail",
  "ABANDONED" = "abandoned",
}

export const TestResultsSchema = z.enum(TestResults);
