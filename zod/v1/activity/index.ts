// AUTO-GENERATED from json-definitions/v1/activity/index.json. Do not edit by hand.

import { z } from "zod";

import { ActivityTypeSchema } from "./../enums/activityType.enum";
import { TestStationTypesSchema } from "./../enums/testStationType.enum";
import { WaitReasonSchema } from "./../enums/waitReason.enum";
import { ClosureReasonTypeSchema } from "./../enums/closureReason.enum";

export const ActivitySchema = z.object({
  "parentId": z.string().optional(),
  "id": z.string().optional(),
  "activityType": ActivityTypeSchema,
  "testStationName": z.string().regex(new RegExp(".*\\S.*")),
  "testStationPNumber": z.string().regex(new RegExp(".*\\S.*")),
  "testStationEmail": z.string(),
  "testStationType": TestStationTypesSchema,
  "testerName": z.string().regex(new RegExp(".*\\S.*")),
  "testerStaffId": z.string().regex(new RegExp(".*\\S.*")),
  "testerEmail": z.email().optional(),
  "startTime": z.string().regex(new RegExp(".*\\S.*")),
  "endTime": z.union([z.string().regex(new RegExp(".*\\S.*")), z.null()]).optional(),
  "waitReason": z.array(WaitReasonSchema).optional(),
  "notes": z.union([z.string().regex(new RegExp(".*\\S.*")), z.null()]).optional(),
  "activityDay": z.string().optional(),
  "closureReason": ClosureReasonTypeSchema.optional(),
}).strict();

export type ActivitySchema = z.infer<typeof ActivitySchema>;
