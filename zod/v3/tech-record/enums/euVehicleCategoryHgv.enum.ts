// AUTO-GENERATED from json-definitions/v3/tech-record/enums/euVehicleCategoryHgv.enum.json. Do not edit by hand.

import { z } from "zod";

export const EUvehiclecategory = {
	"N1": "n1",
	"N2": "n2",
	"N3": "n3",
} as const;

export type EUvehiclecategory = (typeof EUvehiclecategory)[keyof typeof EUvehiclecategory];

export const EUvehiclecategorySchema = z.enum(EUvehiclecategory);
