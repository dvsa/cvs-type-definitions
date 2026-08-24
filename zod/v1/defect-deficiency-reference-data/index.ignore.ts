// AUTO-GENERATED from json-definitions/v1/defect-deficiency-reference-data/index.ignore.json. Do not edit by hand.

import { z } from "zod";

export const DefectDeficiencyReferenceDataSchema = z.object({
  "ref": z.string(),
  "deficiencyId": z.string().nullable(),
  "deficiencySubId": z.string(),
  "deficiencyCategory": z.string(),
  "deficiencyText": z.string(),
  "stdForProhibition": z.boolean(),
  "forVehicleType": z.union([z.array(z.string()), z.enum(["psv","hgv","trl","car","lgv","motorcycle"])]),
}).strict();

export type DefectDeficiencyReferenceDataSchema = z.infer<typeof DefectDeficiencyReferenceDataSchema>;
