// AUTO-GENERATED from json-definitions/enums/vehicleType.enum.json. Do not edit by hand.

import { z } from "zod";

export const VehicleType = {
	"HGV": "hgv",
	"PSV": "psv",
	"TRL": "trl",
	"LGV": "lgv",
	"CAR": "car",
	"MOTORCYCLE": "motorcycle",
} as const;

export type VehicleType = (typeof VehicleType)[keyof typeof VehicleType];

export const VehicleTypeSchema = z.enum(VehicleType);
