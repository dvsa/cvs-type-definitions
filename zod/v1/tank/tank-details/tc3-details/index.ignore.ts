// AUTO-GENERATED from json-definitions/v1/tank/tank-details/tc3-details/index.ignore.json. Do not edit by hand.

import { z } from "zod";

export const TC3DetailsSchema = z.object({
  "tc3Type": z.string().optional(),
  "tc3IntermediateApprovalNo": z.string().optional(),
  "tc3IntermediateExpiryDate": z.string().optional(),
}).strict();

export type TC3DetailsSchema = z.infer<typeof TC3DetailsSchema>;
