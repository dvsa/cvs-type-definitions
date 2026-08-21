// AUTO-GENERATED from json-definitions/v3/tech-record/enums/euVehicleCategoryHgv.enum.json. Do not edit by hand.

import { z } from "zod";

export const EUVehicleCategory = {
	"N1": "n1",
	"N2": "n2",
	"N3": "n3",
} as const;

export type EUVehicleCategory = (typeof EUVehicleCategory)[keyof typeof EUVehicleCategory];

export const EUVehicleCategorySchema = z.enum(EUVehicleCategory);
