// AUTO-GENERATED from json-definitions/v1/defect-details/index.json. Do not edit by hand.

import { z } from "zod";

import { DefectMetadataSchema } from "./../defect-metadata/index.ignore";
import { MediaSchema } from "./../media/index";

export const DefectDetailsSchema = z.object({
  "imNumber": z.number().int(),
  "imDescription": z.string(),
  "additionalInformation": z.unknown(),
  "itemNumber": z.number().int(),
  "itemDescription": z.string(),
  "deficiencyRef": z.string(),
  "deficiencyId": z.string().nullable(),
  "deficiencySubId": z.string().nullable(),
  "deficiencyCategory": z.string(),
  "deficiencyText": z.string().nullable(),
  "stdForProhibition": z.boolean().nullable(),
  "prs": z.boolean().nullable(),
  "prohibitionIssued": z.boolean().nullable(),
  "metadata": DefectMetadataSchema,
  "media": z.array(MediaSchema).optional(),
}).strict();

export type DefectDetailsSchema = z.infer<typeof DefectDetailsSchema>;
