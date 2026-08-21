// AUTO-GENERATED from json-definitions/v3/tech-record/enums/vehicleConfigurationHgvPsv.enum.json. Do not edit by hand.

import { z } from "zod";

export const VehicleConfiguration = {
	"RIGID": "rigid",
	"ARTICULATED": "articulated",
} as const;

export type VehicleConfiguration = (typeof VehicleConfiguration)[keyof typeof VehicleConfiguration];

export const VehicleConfigurationSchema = z.enum(VehicleConfiguration);
