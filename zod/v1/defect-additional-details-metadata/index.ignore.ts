// AUTO-GENERATED from json-definitions/v1/defect-additional-details-metadata/index.ignore.json. Do not edit by hand.

import { z } from "zod";

import { DefectLocationMetadataSchema } from "./../defect-location-metadata/index.ignore";

export const DefectAdditionalDetailsMetadataSchema = z.object({
  "location": DefectLocationMetadataSchema,
  "notes": z.boolean(),
}).strict();

export type DefectAdditionalDetailsMetadataSchema = z.infer<typeof DefectAdditionalDetailsMetadataSchema>;
