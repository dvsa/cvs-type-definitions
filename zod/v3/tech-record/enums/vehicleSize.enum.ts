// AUTO-GENERATED from json-definitions/v3/tech-record/enums/vehicleSize.enum.json. Do not edit by hand.

import { z } from "zod";

export const VehicleSize = {
	"LARGE": "large",
	"SMALL": "small",
} as const;

export type VehicleSize = (typeof VehicleSize)[keyof typeof VehicleSize];

export const VehicleSizeSchema = z.enum(VehicleSize);
