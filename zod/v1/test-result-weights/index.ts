// AUTO-GENERATED from json-definitions/v1/test-result-weights/index.json. Do not edit by hand.

import { z } from "zod";

import { DesignTrainWeightRequiredSchema } from "./../enums/designTrainWeight.enum";

export const TestResultWeightsSchema = z.object({
  "designGrossVehicleWeight": z.number().int(),
  "designGrossTrainWeight": z.number().int().nullable().optional(),
  "designGrossAxleWeight": z.number().int().nullable().optional(),
  "designTrainWeightRequired": DesignTrainWeightRequiredSchema.optional(),
}).strict();

export type TestResultWeightsSchema = z.infer<typeof TestResultWeightsSchema>;
