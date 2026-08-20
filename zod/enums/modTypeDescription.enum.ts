// AUTO-GENERATED from json-definitions/enums/modTypeDescription.enum.json. Do not edit by hand.

import { z } from "zod";

export enum ModTypeDescription {
  "PARTICULATE_TRAP" = "particulate trap",
  "MODIFICATION_OR_CHANGE_OF_ENGINE" = "modification or change of engine",
  "GAS_ENGINE" = "gas engine",
}

export const ModTypeDescriptionSchema = z.enum(ModTypeDescription);
