// AUTO-GENERATED from json-definitions/v1/applicant-details/index.ignore.json. Do not edit by hand.

import { z } from "zod";

export const ApplicantDetailsSchema = z.object({
  "name": z.string().optional(),
  "street": z.string().optional(),
  "town": z.string().optional(),
  "city": z.string().optional(),
  "postcode": z.string().optional(),
}).strict();

export type ApplicantDetailsSchema = z.infer<typeof ApplicantDetailsSchema>;
