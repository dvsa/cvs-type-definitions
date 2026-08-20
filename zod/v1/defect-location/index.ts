// AUTO-GENERATED from json-definitions/v1/defect-location/index.json. Do not edit by hand.

import { z } from "zod";

export const DefectLocationSchema = z.object({
  "vertical": z.string().nullable().optional(),
  "horizontal": z.string().nullable().optional(),
  "lateral": z.string().nullable().optional(),
  "longitudinal": z.string().nullable().optional(),
  "rowNumber": z.number().int().nullable().optional(),
  "seatNumber": z.number().int().nullable().optional(),
  "axleNumber": z.number().int().nullable().optional(),
}).strict();

export type DefectLocationSchema = z.infer<typeof DefectLocationSchema>;
