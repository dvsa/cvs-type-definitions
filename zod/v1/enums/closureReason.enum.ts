// AUTO-GENERATED from json-definitions/v1/enums/closureReason.enum.json. Do not edit by hand.

import { z } from "zod";

export enum ClosureReasonType {
  "AUTOCLOSE" = "Autoclose",
  "MANUAL" = "Manual",
  "CLOSE_ALL" = "Close all",
}

export const ClosureReasonTypeSchema = z.enum(ClosureReasonType);
