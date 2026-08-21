// AUTO-GENERATED from json-definitions/v3/tech-record/enums/euVehicleCategoryLgv.enum.json. Do not edit by hand.

import { z } from "zod";

export const EUVehicleCategory = {
	"N1": "n1",
} as const;

export type EUVehicleCategory = (typeof EUVehicleCategory)[keyof typeof EUVehicleCategory];

export const EUVehicleCategorySchema = z.enum(EUVehicleCategory);
