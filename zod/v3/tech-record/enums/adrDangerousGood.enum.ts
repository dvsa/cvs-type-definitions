// AUTO-GENERATED from json-definitions/v3/tech-record/enums/adrDangerousGood.enum.json. Do not edit by hand.

import { z } from "zod";

export enum ADRDangerousGood {
  "FP" = "FP <61 (FL)",
  "AT" = "AT",
  "MEMU" = "MEMU",
  "CARBON_DISULPHIDE" = "Carbon Disulphide",
  "HYDROGEN" = "Hydrogen",
  "EXPLOSIVES_TYPE_2" = "Explosives (type 2)",
  "EXPLOSIVES_TYPE_3" = "Explosives (type 3)",
}

export const ADRDangerousGoodSchema = z.enum(ADRDangerousGood);
