// AUTO-GENERATED from json-definitions/v1/defect-location-metadata/index.ignore.json. Do not edit by hand.

import { z } from "zod";

export const DefectLocationMetadataSchema = z.object({
  "vertical": z.union([z.array(z.string()), z.null()]).optional(),
  "horizontal": z.union([z.array(z.string()), z.null()]).optional(),
  "lateral": z.union([z.array(z.string()), z.null()]).optional(),
  "longitudinal": z.union([z.array(z.string()), z.null()]).optional(),
  "rowNumber": z.union([z.array(z.number()), z.null()]).optional(),
  "seatNumber": z.union([z.array(z.number().int()), z.null()]).optional(),
  "axleNumber": z.union([z.array(z.number()), z.null()]).optional(),
}).strict();

export type DefectLocationMetadataSchema = z.infer<typeof DefectLocationMetadataSchema>;
