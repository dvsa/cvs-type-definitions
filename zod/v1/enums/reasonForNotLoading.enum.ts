// AUTO-GENERATED from json-definitions/v1/enums/reasonForNotLoading.enum.json. Do not edit by hand.

import { z } from "zod";

export enum ReasonForNotLoading {
  "OBNOXIOUS_LOADS" = "Obnoxious loads",
  "TANKER" = "Tanker",
  "PERISHABLE_GOODS" = "Perishable goods",
  "LIVESTOCK" = "Livestock",
  "CAR_TRANSPORTER" = "Car transporter",
  "REFUSE" = "Refuse",
  "STREET_CLEANER" = "Street cleaner",
  "ULTAST" = "ULTAST",
  "SPECIALIST_BODY_LOAD" = "Specialist body/load",
  "OTHER" = "Other",
}

export const ReasonForNotLoadingSchema = z.enum(ReasonForNotLoading);
