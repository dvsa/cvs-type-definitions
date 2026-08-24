// AUTO-GENERATED from json-definitions/v1/dynamics-test-station/index.json. Do not edit by hand.

import { z } from "zod";

export const DynamicsTestStationSchema = z.object({
  "testStationId": z.string(),
  "testStationPNumber": z.string(),
  "testStationName": z.string(),
  "testStationContactNumber": z.string(),
  "testStationAccessNotes": z.string().nullable().optional(),
  "testStationGeneralNotes": z.string().nullable().optional(),
  "testStationTown": z.string(),
  "testStationAddress": z.string(),
  "testStationPostcode": z.string(),
  "testStationLongitude": z.number().nullable().optional(),
  "testStationLatitude": z.number().nullable().optional(),
  "testStationType": z.string(),
  "testStationEmails": z.array(z.string()),
  "searchProperty": z.string().optional(),
  "testStationCountry": z.string().nullable().optional(),
  "testStationStatus": z.string(),
}).strict();

export type DynamicsTestStationSchema = z.infer<typeof DynamicsTestStationSchema>;
