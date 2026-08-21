// AUTO-GENERATED from json-definitions/v3/tech-record/enums/euVehicleCategoryCar.enum.json. Do not edit by hand.

import { z } from "zod";

export const EUvehiclecategory = {
	"M1": "m1",
} as const;

export type EUvehiclecategory = (typeof EUvehiclecategory)[keyof typeof EUvehiclecategory];

export const EUvehiclecategorySchema = z.enum(EUvehiclecategory);
