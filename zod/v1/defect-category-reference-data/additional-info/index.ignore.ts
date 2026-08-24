// AUTO-GENERATED from json-definitions/v1/defect-category-reference-data/additional-info/index.ignore.json. Do not edit by hand.

import { z } from "zod";

export const AdditionalInfoSchema = z.object({
  "psv": z.unknown(),
  "hgv": z.unknown(),
  "trl": z.unknown(),
}).strict();

export type AdditionalInfoSchema = z.infer<typeof AdditionalInfoSchema>;
