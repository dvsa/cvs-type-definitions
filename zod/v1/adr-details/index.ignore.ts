// AUTO-GENERATED from json-definitions/v1/adr-details/index.ignore.json. Do not edit by hand.

import { z } from "zod";

import { ApplicantDetailsSchema } from "./../applicant-details/index.ignore";
import { TankSchema } from "./../tank/index.ignore";

export const ADRDetailsSchema = z.object({
  "vehicleDetails": z.object({
  "type": z.string().optional(),
  "approvalDate": z.string().optional(),
}).strict().optional(),
  "listStatementApplicable": z.boolean().optional(),
  "batteryListNumber": z.string().optional(),
  "permittedDangerousGoods": z.array(z.string()).optional(),
  "additionalExaminerNotes": z.string().optional(),
  "applicantDetails": ApplicantDetailsSchema.optional(),
  "memosApply": z.array(z.string()).optional(),
  "additionalNotes": z.object({
  "number": z.array(z.string()).optional(),
  "guidanceNotes": z.array(z.string()).optional(),
}).strict().optional(),
  "adrTypeApprovalNo": z.string().optional(),
  "compatibilityGroupJ": z.boolean().optional(),
  "tank": TankSchema.optional(),
}).strict();

export type ADRDetailsSchema = z.infer<typeof ADRDetailsSchema>;
