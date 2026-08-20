// AUTO-GENERATED from json-definitions/v1/enums/testStationType.enum.json. Do not edit by hand.

import { z } from "zod";

export enum TestStationTypes {
  "ATF" = "atf",
  "GVTS" = "gvts",
  "HQ" = "hq",
  "POTF" = "potf",
  "VEF" = "vef",
}

export const TestStationTypesSchema = z.enum(TestStationTypes);
