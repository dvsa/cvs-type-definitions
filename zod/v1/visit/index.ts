// AUTO-GENERATED from json-definitions/v1/visit/index.json. Do not edit by hand.

import { z } from "zod";

import { CommercialVehicleTestSchema } from "./../test/index";

export const VisitSchema = z.object({
  "startTime": z.string(),
  "endTime": z.string(),
  "testStationName": z.string(),
  "testStationPNumber": z.string(),
  "testStationEmail": z.string(),
  "testStationType": z.string(),
  "testerName": z.string(),
  "testerId": z.string(),
  "testerEmail": z.string(),
  "tests": z.array(CommercialVehicleTestSchema),
  "id": z.string().optional(),
}).strict();

export type VisitSchema = z.infer<typeof VisitSchema>;
