// AUTO-GENERATED from json-definitions/v1/enums/activityType.enum.json. Do not edit by hand.

import { z } from "zod";

export const ActivityType = {
	"VISIT": "visit",
	"WAIT": "wait",
	"UNACCOUNTABLE_TIME": "unaccountable time",
} as const;

export type ActivityType = (typeof ActivityType)[keyof typeof ActivityType];

export const ActivityTypeSchema = z.enum(ActivityType);
