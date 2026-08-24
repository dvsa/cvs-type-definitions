// AUTO-GENERATED from json-definitions/required-standards/defects/get/index.json. Do not edit by hand.

import { z } from "zod";

import { EUVehicleCategorySchema } from "./../enums/euVehicleCategory.enum";
import { RequiredStandardTaxonomySectionSchema } from "./../requiredStandardTaxonomySection";

export const DefectGETRequiredStandardsSchema = z.object({
  "euVehicleCategories": z.array(EUVehicleCategorySchema),
  "basic": z.array(RequiredStandardTaxonomySectionSchema),
  "normal": z.array(RequiredStandardTaxonomySectionSchema),
}).strict();

export type DefectGETRequiredStandards = z.infer<typeof DefectGETRequiredStandardsSchema>;
