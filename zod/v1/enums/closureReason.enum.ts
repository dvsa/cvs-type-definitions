// AUTO-GENERATED from json-definitions/v1/enums/closureReason.enum.json. Do not edit by hand.

import { z } from "zod";

export const ClosureReasonType = {
	"AUTOCLOSE": "Autoclose",
	"MANUAL": "Manual",
	"CLOSE_ALL": "Close all",
} as const;

export type ClosureReasonType = (typeof ClosureReasonType)[keyof typeof ClosureReasonType];

export const ClosureReasonTypeSchema = z.enum(ClosureReasonType);
