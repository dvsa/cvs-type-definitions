// AUTO-GENERATED from json-definitions/v3/tech-record/enums/vehicleClassDescriptionPSV.enum.json. Do not edit by hand.

import { z } from "zod";

export enum VehicleClassDescription {
  "SMALL_PSV" = "small psv (ie: less than or equal to 22 seats)",
  "LARGE_PSV" = "large psv(ie: greater than 23 seats)",
}

export const VehicleClassDescriptionSchema = z.enum(VehicleClassDescription);
