// AUTO-GENERATED from json-definitions/v1/enums/emissionStandard.enum.json. Do not edit by hand.

import { z } from "zod";

export const EmissionStandards = {
	"EURO3_PM": "0.10 g/kWh Euro 3 PM",
	"EURO4_PM": "0.03 g/kWh Euro IV PM",
	"EURO3": "Euro 3",
	"EURO4": "Euro 4",
	"EURO5": "Euro 5",
	"EURO6": "Euro 6",
	"EUROV": "Euro V",
	"EUROVI": "Euro VI",
	"FULL_ELECTRIC": "Full Electric",
} as const;

export type EmissionStandards = (typeof EmissionStandards)[keyof typeof EmissionStandards];

export const EmissionStandardsSchema = z.enum(EmissionStandards);
