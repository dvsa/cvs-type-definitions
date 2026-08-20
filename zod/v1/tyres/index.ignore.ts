// AUTO-GENERATED from json-definitions/v1/tyres/index.ignore.json. Do not edit by hand.

import { z } from "zod";

export const TyresSchema = z.object({
  "tyreSize": z.string(),
  "plyRating": z.string(),
  "fitmentCode": z.string(),
  "dataTrPsvAxles": z.number().int().optional(),
  "tyreCode": z.number(),
  "dataTrAxles": z.number().optional(),
  "speedCategorySymbol": z.string().meta({ description: "PSV only" }).optional(),
}).strict();

export type TyresSchema = z.infer<typeof TyresSchema>;
