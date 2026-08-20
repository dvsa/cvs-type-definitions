// AUTO-GENERATED from json-definitions/v1/specialist-custom-defects/index.ignore.json. Do not edit by hand.

import { z } from "zod";

export const SpecialistCustomDefectsSchema = z.object({
  "referenceNumber": z.string(),
  "defectName": z.string(),
  "defectNotes": z.string(),
  "hasAllMandatoryFields": z.boolean().meta({ description: "FE only" }).optional(),
}).strict();

export type SpecialistCustomDefectsSchema = z.infer<typeof SpecialistCustomDefectsSchema>;
