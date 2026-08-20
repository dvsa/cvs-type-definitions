// AUTO-GENERATED from json-definitions/v1/vtg15/index.json. Do not edit by hand.

import { z } from "zod";

import { HazardClassificationSchema } from "./../../enums/hazardClassification.enum";
import { MediaSchema } from "./../media/index";

export const VTG15Schema = z.object({
  "vtg15Required": z.boolean(),
  "unNumber": z.number().optional(),
  "primaryHazardClassification": HazardClassificationSchema.optional(),
  "secondaryHazardClassification": HazardClassificationSchema.optional(),
  "media": z.array(MediaSchema).optional(),
}).strict();

export type VTG15Schema = z.infer<typeof VTG15Schema>;
