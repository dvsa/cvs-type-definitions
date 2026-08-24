// AUTO-GENERATED from json-definitions/required-standards/defects/requiredStandardTaxonomySection.json. Do not edit by hand.

import { z } from "zod";

import { InspectionTypeSchema } from "./enums/inspectionType.ignore";

export const RequiredStandardTaxonomySectionSchema = z.object({
  "sectionNumber": z.string(),
  "sectionDescription": z.string(),
  "requiredStandards": z.array(z.object({
  "rsNumber": z.number().int(),
  "requiredStandard": z.string(),
  "refCalculation": z.string(),
  "additionalInfo": z.boolean(),
  "inspectionTypes": z.array(InspectionTypeSchema),
}).strict()),
}).strict();

export type RequiredStandardTaxonomySection = z.infer<typeof RequiredStandardTaxonomySectionSchema>;
