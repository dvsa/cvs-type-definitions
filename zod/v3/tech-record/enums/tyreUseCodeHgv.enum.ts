// AUTO-GENERATED from json-definitions/v3/tech-record/enums/tyreUseCodeHgv.enum.json. Do not edit by hand.

import { z } from "zod";

export const TyreUseCode = {
	"_2R": "2R",
	"_2B": "2B",
	"_2J": "2J",
	"_2M": "2M",
} as const;

export type TyreUseCode = (typeof TyreUseCode)[keyof typeof TyreUseCode];

export const TyreUseCodeSchema = z.enum(TyreUseCode);
