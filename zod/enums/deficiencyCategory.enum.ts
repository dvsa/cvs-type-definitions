// AUTO-GENERATED from json-definitions/enums/deficiencyCategory.enum.json. Do not edit by hand.

import { z } from "zod";

export enum DeficiencyCategory {
  "ADVISORY" = "advisory",
  "DANGEROUS" = "dangerous",
  "MAJOR" = "major",
  "MINOR" = "minor",
}

export const DeficiencyCategorySchema = z.enum(DeficiencyCategory);
