// AUTO-GENERATED from json-definitions/v3/tech-record/enums/euVehicleCategoryPsv.enum.json. Do not edit by hand.

import { z } from "zod";

export const EUVehicleCategory = {
	"M1": "m1",
	"M2": "m2",
	"M3": "m3",
} as const;

export type EUVehicleCategory = (typeof EUVehicleCategory)[keyof typeof EUVehicleCategory];

export const EUVehicleCategorySchema = z.enum(EUVehicleCategory);
