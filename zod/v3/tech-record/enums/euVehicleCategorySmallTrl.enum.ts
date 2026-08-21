// AUTO-GENERATED from json-definitions/v3/tech-record/enums/euVehicleCategorySmallTrl.enum.json. Do not edit by hand.

import { z } from "zod";

export const EUvehiclecategory = {
	"O1": "o1",
	"O2": "o2",
} as const;

export type EUvehiclecategory = (typeof EUvehiclecategory)[keyof typeof EUvehiclecategory];

export const EUvehiclecategorySchema = z.enum(EUvehiclecategory);
