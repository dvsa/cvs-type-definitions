// AUTO-GENERATED from json-definitions/v3/tech-record/enums/vehicleSubclass.ignore.json. Do not edit by hand.

import { z } from "zod";

export const VehicleSubclassSchema = z.array(z.enum(["n","p","a","s","c","l","t","e","m","r","w"]));

export type VehicleSubclass = z.infer<typeof VehicleSubclassSchema>;
