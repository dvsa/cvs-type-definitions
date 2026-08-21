// AUTO-GENERATED from json-definitions/v3/tech-record/enums/euVehicleCategoryTrl.enum.json. Do not edit by hand.

import { z } from "zod";

export const EUVehicleCategory = {
	"O1": "o1",
	"O2": "o2",
	"O3": "o3",
	"O4": "o4",
} as const;

export type EUVehicleCategory = (typeof EUVehicleCategory)[keyof typeof EUVehicleCategory];

export const EUVehicleCategorySchema = z.enum(EUVehicleCategory);
