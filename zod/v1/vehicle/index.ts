// AUTO-GENERATED from json-definitions/v1/vehicle/index.json. Do not edit by hand.

import { z } from "zod";

import { TechRecordSchema } from "./../tech-record/index";
import { TestResultSchema } from "./../test-result/index";
import { TestResultTestTypeSchema } from "./../test-result-test-type/index";

export const VehicleSchema = z.object({
  "systemNumber": z.string(),
  "vrm": z.string(),
  "vin": z.string(),
  "techRecord": TechRecordSchema,
  "testResultsHistory": z.array(TestResultSchema).optional(),
  "countryOfRegistration": z.string().optional(),
  "euVehicleCategory": z.string().optional(),
  "odometerReading": z.string().optional(),
  "odometerMetric": z.string().optional(),
  "preparerId": z.string().optional(),
  "preparerName": z.string().optional(),
  "testTypes": z.array(TestResultTestTypeSchema).optional(),
  "trailerId": z.string().meta({ description: "trailer only" }).optional(),
}).strict();

export type VehicleSchema = z.infer<typeof VehicleSchema>;
