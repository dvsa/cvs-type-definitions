// AUTO-GENERATED from json-definitions/v3/tech-record/enums/vehicleClassDescription.enum.json. Do not edit by hand.

import { z } from "zod";

export enum VehicleClassDescription {
  "MotorbikesOver200ccOrWithASidecar" = "motorbikes over 200cc or with a sidecar",
  "NotApplicable" = "not applicable",
  "SmallPsvIeLessThanOrEqualTo22Seats" = "small psv (ie: less than or equal to 22 seats)",
  "MotorbikesUpTo200cc" = "motorbikes up to 200cc",
  "Trailer" = "trailer",
  "LargePsvIeGreaterThan23Seats" = "large psv(ie: greater than 23 seats)",
  "_3Wheelers" = "3 wheelers",
  "HeavyGoodsVehicle" = "heavy goods vehicle",
  "MOTClass4" = "MOT class 4",
  "MOTClass7" = "MOT class 7",
  "MOTClass5" = "MOT class 5",
}

export const VehicleClassDescriptionSchema = z.enum(VehicleClassDescription);
