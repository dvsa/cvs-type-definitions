// AUTO-GENERATED from json-definitions/v1/enums/fuelType.enum.json. Do not edit by hand.

import { z } from "zod";

export const FuelType = {
	"DIESEL": "diesel",
	"GAS_CNG": "gas-cng",
	"GAS_LNG": "gas-lng",
	"GAS_LPG": "gas-lpg",
	"PETROL": "petrol",
	"FUEL_CELL": "fuel cell",
	"FULL_ELECTRIC": "full electric",
} as const;

export type FuelType = (typeof FuelType)[keyof typeof FuelType];

export const FuelTypeSchema = z.enum(FuelType);
