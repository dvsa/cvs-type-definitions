// AUTO-GENERATED from json-definitions/enums/vehicleSubclass.enum.json. Do not edit by hand.

import { z } from "zod";

export const VehicleSubclass = {
	"A": "a",
	"C": "c",
	"S": "s",
	"L": "l",
	"M": "m",
	"N": "n",
	"P": "p",
	"T": "t",
	"R": "r",
} as const;

export type VehicleSubclass = (typeof VehicleSubclass)[keyof typeof VehicleSubclass];

export const VehicleSubclassSchema = z.enum(VehicleSubclass);
