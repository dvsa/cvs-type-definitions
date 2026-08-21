// AUTO-GENERATED from json-definitions/v3/tech-record/enums/vehicleConfigurationTrl.enum.json. Do not edit by hand.

import { z } from "zod";

export const VehicleConfiguration = {
	"CENTRE_AXLE_DRAWBAR": "centre axle drawbar",
	"SEMI_CAR_TRANSPORTER": "semi-car transporter",
	"SEMI_TRAILER": "semi-trailer",
	"LONG_SEMI_TRAILER": "long semi-trailer",
	"LOW_LOADER": "low loader",
	"OTHER": "other",
	"DRAWBAR": "drawbar",
	"FOUR_IN_LINE": "four-in-line",
	"DOLLY": "dolly",
	"FULL_DRAWBAR": "full drawbar",
} as const;

export type VehicleConfiguration = (typeof VehicleConfiguration)[keyof typeof VehicleConfiguration];

export const VehicleConfigurationSchema = z.enum(VehicleConfiguration);
