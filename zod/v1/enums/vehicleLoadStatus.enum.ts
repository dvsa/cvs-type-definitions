// AUTO-GENERATED from json-definitions/v1/enums/vehicleLoadStatus.enum.json. Do not edit by hand.

import { z } from "zod";

export const VehicleLoadStatusType = {
	"UNLADEN": "Unladen",
	"PARTIALLY_LADEN": "Partially laden",
	"PARTIALLY_LADEN_50_TO_65": "Partially laden 50% to 65%",
	"FULLY_LADEN": "Fully laden",
	"LOAD_SIMULATED_PARTIALLY_LADEN": "Load simulated partially laden",
	"LOAD_SIMULATED_FULLY_LADEN": "Load simulated fully laden",
} as const;

export type VehicleLoadStatusType = (typeof VehicleLoadStatusType)[keyof typeof VehicleLoadStatusType];

export const VehicleLoadStatusTypeSchema = z.enum(VehicleLoadStatusType);
