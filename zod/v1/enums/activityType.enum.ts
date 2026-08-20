// AUTO-GENERATED from json-definitions/v1/enums/activityType.enum.json. Do not edit by hand.

import { z } from "zod";

export enum ActivityType {
  "VISIT" = "visit",
  "WAIT" = "wait",
  "UNACCOUNTABLE_TIME" = "unaccountable time",
}

export const ActivityTypeSchema = z.enum(ActivityType);
