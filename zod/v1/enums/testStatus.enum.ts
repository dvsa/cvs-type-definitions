// AUTO-GENERATED from json-definitions/v1/enums/testStatus.enum.json. Do not edit by hand.

import { z } from "zod";

export enum TestStatus {
  "SUBMITTED" = "submitted",
  "CANCELLED" = "cancelled",
}

export const TestStatusSchema = z.enum(TestStatus);
