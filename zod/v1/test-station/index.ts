// AUTO-GENERATED from json-definitions/v1/test-station/index.json. Do not edit by hand.

import { z } from "zod";

export const TestStationSchema = z.object({
  "testStationId": z.string(),
  "testStationPNumber": z.string(),
  "testStationName": z.string(),
  "testStationContactNumber": z.string(),
  "testStationAccessNotes": z.string(),
  "testStationGeneralNotes": z.string(),
  "testStationTown": z.string(),
  "testStationAddress": z.string(),
  "testStationPostcode": z.string(),
  "testStationLongitude": z.number().int(),
  "testStationLatitude": z.number().int(),
  "testStationType": z.string(),
  "testStationEmails": z.array(z.string()),
  "searchProperty": z.string().optional(),
  "testStationCountry": z.string().optional(),
  "testStationStatus": z.string(),
}).strict();

export type TestStationSchema = z.infer<typeof TestStationSchema>;
