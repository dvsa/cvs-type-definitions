// AUTO-GENERATED from json-definitions/v3/tech-record/enums/fuelPropulsionSystem.ignore.json. Do not edit by hand.

import { z } from "zod";

export const FuelPropulsionSystemSchema = z.enum(["DieselPetrol","Diesel","Petrol","Hybrid","Electric","CNG","Fuel cell","LNG","Ethanol","Other"]);

export type FuelPropulsionSystem = z.infer<typeof FuelPropulsionSystemSchema>;
