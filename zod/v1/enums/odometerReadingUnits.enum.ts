// AUTO-GENERATED from json-definitions/v1/enums/odometerReadingUnits.enum.json. Do not edit by hand.

import { z } from "zod";

export const OdometerReadingUnits = {
	"KILOMETRES": "kilometres",
	"MILES": "miles",
} as const;

export type OdometerReadingUnits = (typeof OdometerReadingUnits)[keyof typeof OdometerReadingUnits];

export const OdometerReadingUnitsSchema = z.enum(OdometerReadingUnits);
