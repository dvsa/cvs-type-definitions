// AUTO-GENERATED from json-definitions/v3/tech-record/enums/plateReasonForIssue.ignore.json. Do not edit by hand.

import { z } from "zod";

export const PlateReasonForIssueSchema = z.enum(["Free replacement","Replacement","Destroyed","Provisional","Original","Manual"]);

export type PlateReasonForIssue = z.infer<typeof PlateReasonForIssueSchema>;
