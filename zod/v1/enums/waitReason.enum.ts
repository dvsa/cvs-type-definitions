// AUTO-GENERATED from json-definitions/v1/enums/waitReason.enum.json. Do not edit by hand.

import { z } from "zod";

export enum WaitReason {
  "WAITING_FOR_VEHICLE" = "Waiting for vehicle",
  "BREAK" = "Break",
  "ADMIN" = "Admin",
  "SITE_ISSUE" = "Site issue",
  "OTHER" = "Other",
}

export const WaitReasonSchema = z.enum(WaitReason);
