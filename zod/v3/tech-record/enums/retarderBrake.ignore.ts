// AUTO-GENERATED from json-definitions/v3/tech-record/enums/retarderBrake.ignore.json. Do not edit by hand.

import { z } from "zod";

export const RetarderBrakeSchema = z.enum(["electric","exhaust","friction","hydraulic","other","none"]);

export type RetarderBrake = z.infer<typeof RetarderBrakeSchema>;
