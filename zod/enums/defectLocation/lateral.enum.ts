// AUTO-GENERATED from json-definitions/enums/defectLocation/lateral.enum.json. Do not edit by hand.

import { z } from "zod";

export enum LateralLocation {
  "NEARSIDE" = "nearside",
  "CENTRE" = "centre",
  "OFFSIDE" = "offside",
}

export const LateralLocationSchema = z.enum(LateralLocation);
