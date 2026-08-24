// AUTO-GENERATED from json-definitions/v1/required-standards/index.ignore.json. Do not edit by hand.

import { z } from "zod";

import { InspectionTypeSchema } from "./../../required-standards/defects/enums/inspectionType.ignore";

export const SpecialistCustomDefectsSchemaPutSchema = z.object({
  "sectionNumber": z.string(),
  "sectionDescription": z.string(),
  "additionalNotes": z.string().nullable().optional(),
  "rsNumber": z.number().int(),
  "requiredStandard": z.string(),
  "refCalculation": z.string(),
  "additionalInfo": z.boolean(),
  "inspectionTypes": z.array(InspectionTypeSchema).optional(),
  "prs": z.boolean(),
}).strict();

export type SpecialistCustomDefectsSchemaPut = z.infer<typeof SpecialistCustomDefectsSchemaPutSchema>;
