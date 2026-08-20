// AUTO-GENERATED from json-definitions/required-standards/defects/enums/inspectionType.ignore.json. Do not edit by hand.

import { z } from "zod";

export const InspectionTypeSchema = z.enum(["basic","normal"]);

export type InspectionType = z.infer<typeof InspectionTypeSchema>;
