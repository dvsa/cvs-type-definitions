// AUTO-GENERATED from json-definitions/v1/defect-category-reference-data/index.json. Do not edit by hand.

import { z } from "zod";

import { AdditionalInfoSchema } from "./additional-info/index.ignore";
import { DefectItemReferenceDataSchema } from "./../defect-item-reference-data/index.ignore";

export const DefectCategoryReferenceDataSchema = z.object({
  "imNumber": z.number().int(),
  "imDescription": z.string(),
  "forVehicleType": z.array(z.string()),
  "additionalInfo": AdditionalInfoSchema,
  "items": z.array(DefectItemReferenceDataSchema),
}).strict();

export type DefectCategoryReferenceDataSchema = z.infer<typeof DefectCategoryReferenceDataSchema>;
