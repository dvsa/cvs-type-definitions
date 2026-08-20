// AUTO-GENERATED from json-definitions/v1/enums/typeOfTest.enum.json. Do not edit by hand.

import { z } from "zod";

export enum Typeoftest {
  "CONTINGENCY" = "contingency",
  "DESK_BASED" = "desk-based",
  "COMPLETION" = "completion",
}

export const TypeoftestSchema = z.enum(Typeoftest);
