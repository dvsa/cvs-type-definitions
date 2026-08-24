// AUTO-GENERATED from json-definitions/v3/tech-record/enums/vehicleType.ignore.json. Do not edit by hand.

import { z } from "zod";

export const VehicleTypeSchema = z.enum(["psv","trl","hgv","car","lgv","motorcycle"]);

export type VehicleType = z.infer<typeof VehicleTypeSchema>;
