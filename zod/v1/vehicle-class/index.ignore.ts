// AUTO-GENERATED from json-definitions/v1/vehicle-class/index.ignore.json. Do not edit by hand.

import { z } from "zod";

export const VehicleClassSchema = z.object({
  "code": z.string(),
  "description": z.string(),
}).strict();

export type VehicleClassSchema = z.infer<typeof VehicleClassSchema>;
