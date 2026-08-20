// AUTO-GENERATED from json-definitions/enums/vehicleType.enum.json. Do not edit by hand.

import { z } from "zod";

export enum VehicleType {
  "HGV" = "hgv",
  "PSV" = "psv",
  "TRL" = "trl",
  "LGV" = "lgv",
  "CAR" = "car",
  "MOTORCYCLE" = "motorcycle",
}

export const VehicleTypeSchema = z.enum(VehicleType);
