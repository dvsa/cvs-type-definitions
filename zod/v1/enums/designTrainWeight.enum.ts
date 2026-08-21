// AUTO-GENERATED from json-definitions/v1/enums/designTrainWeight.enum.json. Do not edit by hand.

import { z } from "zod";

export const DesignTrainWeightRequired = {
	"NOT_APPLICABLE": "N/A",
} as const;

export type DesignTrainWeightRequired = (typeof DesignTrainWeightRequired)[keyof typeof DesignTrainWeightRequired];

export const DesignTrainWeightRequiredSchema = z.enum(DesignTrainWeightRequired);
