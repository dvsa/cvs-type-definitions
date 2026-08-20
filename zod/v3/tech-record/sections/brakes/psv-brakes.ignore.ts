// AUTO-GENERATED from json-definitions/v3/tech-record/sections/brakes/psv-brakes.ignore.json. Do not edit by hand.

import { z } from "zod";

export const PSVBrakesSchema = z.object({
  "techRecord_brakes_dtpNumber": z.string().nullable().optional(),
  "techRecord_brakes_brakeCode": z.string().nullable().optional(),
  "techRecord_brakes_brakeCodeOriginal": z.string().nullable().optional(),
  "techRecord_brakes_dataTrBrakeOne": z.string().nullable().optional(),
  "techRecord_brakes_dataTrBrakeTwo": z.string().nullable().optional(),
  "techRecord_brakes_dataTrBrakeThree": z.string().nullable().optional(),
  "techRecord_brakes_retarderBrakeOne": z.union([z.unknown(), z.null()]).optional(),
  "techRecord_brakes_retarderBrakeTwo": z.union([z.unknown(), z.null()]).optional(),
  "techRecord_brakes_brakeForceWheelsNotLocked_parkingBrakeForceA": z.number().int().nullable().optional(),
  "techRecord_brakes_brakeForceWheelsNotLocked_secondaryBrakeForceA": z.number().int().nullable().optional(),
  "techRecord_brakes_brakeForceWheelsNotLocked_serviceBrakeForceA": z.number().int().nullable().optional(),
  "techRecord_brakes_brakeForceWheelsUpToHalfLocked_parkingBrakeForceB": z.number().int().nullable().optional(),
  "techRecord_brakes_brakeForceWheelsUpToHalfLocked_secondaryBrakeForceB": z.number().int().nullable().optional(),
  "techRecord_brakes_brakeForceWheelsUpToHalfLocked_serviceBrakeForceB": z.number().int().nullable().optional(),
}).strict();

export type PSVBrakes = z.infer<typeof PSVBrakesSchema>;
