// AUTO-GENERATED from json-definitions/v1/load-status/index.json. Do not edit by hand.

import { z } from "zod";

import { VehicleLoadStatusTypeSchema } from "./../enums/vehicleLoadStatus.enum";
import { UnladenBodyTypeSchema } from "./../enums/unladenBodyType.enum";
import { ReasonForNotLoadingSchema } from "./../enums/reasonForNotLoading.enum";

export const LoadStatusSchema = z.object({
  "vehicleLoadStatus": VehicleLoadStatusTypeSchema.optional(),
  "unladenBodyType": UnladenBodyTypeSchema.optional(),
  "otherUnladenBodyType": z.string().nullable().optional(),
  "reasonForNotLoading": ReasonForNotLoadingSchema.optional(),
  "otherReasonForNotLoading": z.string().nullable().optional(),
  "partiallyLadenReason": z.string().nullable().optional(),
}).strict();

export type LoadStatusSchema = z.infer<typeof LoadStatusSchema>;
