// AUTO-GENERATED from json-definitions/v3/tech-record/enums/adrTankStatementSubstancePermitted.json. Do not edit by hand.

import { z } from "zod";

export enum ADRTankStatementSubstancePermitted {
  "UNDER_TANK_CODE" = "Substances permitted under the tank code and any special provisions specified in 9 may be carried",
  "UNDER_UN_NUMBER" = "Substances (Class UN number and if necessary packing group and proper shipping name) may be carried",
}

export const ADRTankStatementSubstancePermittedSchema = z.enum(ADRTankStatementSubstancePermitted);
