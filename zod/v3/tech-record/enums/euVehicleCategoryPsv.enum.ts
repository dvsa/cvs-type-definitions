// AUTO-GENERATED from json-definitions/v3/tech-record/enums/euVehicleCategoryPsv.enum.json. Do not edit by hand.

import { z } from "zod";

export const EUvehiclecategory = {
	"M1": "m1",
	"M2": "m2",
	"M3": "m3",
} as const;

export type EUvehiclecategory = (typeof EUvehiclecategory)[keyof typeof EUvehiclecategory];

export const EUvehiclecategorySchema = z.enum(EUvehiclecategory);
