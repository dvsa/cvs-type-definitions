// AUTO-GENERATED from json-definitions/v1/enums/waitReason.enum.json. Do not edit by hand.

import { z } from "zod";

export const WaitReason = {
	"WAITING_FOR_VEHICLE": "Waiting for vehicle",
	"BREAK": "Break",
	"ADMIN": "Admin",
	"SITE_ISSUE": "Site issue",
	"OTHER": "Other",
} as const;

export type WaitReason = (typeof WaitReason)[keyof typeof WaitReason];

export const WaitReasonSchema = z.enum(WaitReason);
