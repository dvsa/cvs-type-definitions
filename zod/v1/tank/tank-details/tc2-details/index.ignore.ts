// AUTO-GENERATED from json-definitions/v1/tank/tank-details/tc2-details/index.ignore.json. Do not edit by hand.

import { z } from "zod";

export const TC2DetailsSchema = z.object({
  "tc2Type": z.string().optional(),
  "tc2IntermediateApprovalNo": z.string().optional(),
  "tc2IntermediateExpiryDate": z.string().optional(),
}).strict();

export type TC2DetailsSchema = z.infer<typeof TC2DetailsSchema>;
