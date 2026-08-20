// AUTO-GENERATED from json-definitions/v1/enums/unladenBodyType.enum.json. Do not edit by hand.

import { z } from "zod";

export enum UnladenBodyType {
  "SKELETAL" = "Skeletal",
  "CURTAIN" = "Curtain",
  "FRIDGE" = "Fridge",
  "BOX" = "Box",
  "TANK" = "Tank",
  "FLAT" = "Flat",
  "CAR_TRANSPORTER" = "Car transporter",
  "FIXED_PLANT" = "Fixed plant",
  "TIPPER" = "Tipper",
  "REFUSE" = "Refuse",
  "STREET_CLEANER" = "Street cleaner",
  "SPECIALISED_VEHICLE_TRAILER" = "Specialised vehicle/trailer",
  "OTHER" = "Other",
}

export const UnladenBodyTypeSchema = z.enum(UnladenBodyType);
