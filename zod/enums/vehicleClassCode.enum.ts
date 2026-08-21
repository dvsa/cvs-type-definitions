// AUTO-GENERATED from json-definitions/enums/vehicleClassCode.enum.json. Do not edit by hand.

import { z } from "zod";

export const VehicleClassCode = {
	"_1": "1",
	"_2": "2",
	"_3": "3",
	"N": "n",
	"S": "s",
	"T": "t",
	"L": "l",
	"V": "v",
	"_4": "4",
	"_5": "5",
	"_7": "7",
	"P": "p",
	"U": "u",
} as const;

export type VehicleClassCode = (typeof VehicleClassCode)[keyof typeof VehicleClassCode];

export const VehicleClassCodeSchema = z.enum(VehicleClassCode);
