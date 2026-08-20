// AUTO-GENERATED from json-definitions/v3/tech-record/enums/euroStandard.ignore.json. Do not edit by hand.

import { z } from "zod";

export const EurostandardSchema = z.enum(["0.10 g/kWh Euro 3 PM","0.03 g/kWh Euro IV PM","Euro 3","Euro 4","Euro 5","Euro 6","Euro V","Euro VI","Full Electric"]);

export type Eurostandard = z.infer<typeof EurostandardSchema>;
