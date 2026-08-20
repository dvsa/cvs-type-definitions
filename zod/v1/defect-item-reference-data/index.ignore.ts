// AUTO-GENERATED from json-definitions/v1/defect-item-reference-data/index.ignore.json. Do not edit by hand.

import { z } from "zod";

import { DefectDeficiencyReferenceDataSchema } from "./../defect-deficiency-reference-data/index.ignore";

export const DefectItemReferenceDataSchema = z.object({
  "itemNumber": z.number().int().optional(),
  "itemDescription": z.string().optional(),
  "forVehicleType": z.array(z.string()).optional(),
  "deficiencies": z.array(DefectDeficiencyReferenceDataSchema).optional(),
}).strict();

export type DefectItemReferenceDataSchema = z.infer<typeof DefectItemReferenceDataSchema>;
