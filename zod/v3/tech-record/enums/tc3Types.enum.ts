// AUTO-GENERATED from json-definitions/v3/tech-record/enums/tc3Types.enum.json. Do not edit by hand.

import { z } from "zod";

export enum TC3Types {
  "INTERMEDIATE" = "intermediate",
  "PERIODIC" = "periodic",
  "EXCEPTIONAL" = "exceptional",
}

export const TC3TypesSchema = z.enum(TC3Types);
