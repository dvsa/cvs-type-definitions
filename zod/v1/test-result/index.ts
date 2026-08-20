// AUTO-GENERATED from json-definitions/v1/test-result/index.json. Do not edit by hand.

import { z } from "zod";

import { TestStationTypesSchema } from "./../enums/testStationType.enum";
import { TestStatusSchema } from "./../enums/testStatus.enum";
import { VehicleClassSchema } from "./../vehicle-class/index.ignore";
import { VehicleTypeSchema } from "./../../v3/tech-record/enums/vehicleType.ignore";
import { OdometerReadingUnitsSchema } from "./../enums/odometerReadingUnits.enum";
import { EUvehiclecategorySchema } from "./../../v3/tech-record/enums/euVehicleCategory.enum";
import { MediaSchema } from "./../media/index";
import { TestResultWeightsSchema } from "./../test-result-weights/index";
import { VTG15Schema } from "./../vtg15/index";
import { TestResultTestTypeSchema } from "./../test-result-test-type/index";
import { TypeoftestSchema } from "./../enums/typeOfTest.enum";
import { TestSourcesSchema } from "./../enums/sources.enum";
import { RecallsSchema } from "./../recalls/index";

export const TestResultSchema: z.ZodType<any> = z.object({
  "testResultId": z.string(),
  "testStationName": z.string().nullable(),
  "testStationPNumber": z.string().nullable(),
  "testStationType": TestStationTypesSchema,
  "testerName": z.string().nullable(),
  "testerStaffId": z.string(),
  "testerEmailAddress": z.string().nullable(),
  "testStartTimestamp": z.string(),
  "testEndTimestamp": z.string(),
  "testStatus": TestStatusSchema,
  "reasonForCancellation": z.string().nullable(),
  "systemNumber": z.string(),
  "vrm": z.string().optional(),
  "trailerId": z.string().optional(),
  "vin": z.string(),
  "vehicleClass": VehicleClassSchema,
  "vehicleSubclass": z.array(z.string()).optional(),
  "vehicleType": VehicleTypeSchema,
  "vehicleConfiguration": z.string(),
  "odometerReading": z.number().nullable().optional(),
  "odometerReadingUnits": z.union([OdometerReadingUnitsSchema, z.null()]).optional(),
  "preparerId": z.string().nullable(),
  "preparerName": z.string().nullable(),
  "euVehicleCategory": EUvehiclecategorySchema,
  "countryOfRegistration": z.string().nullable(),
  "noOfAxles": z.number().int(),
  "numberOfWheelsDriven": z.number().int().nullable(),
  "vehicleSize": z.string().optional(),
  "numberOfSeats": z.number().int().optional(),
  "regnDate": z.string().nullable().optional(),
  "firstUseDate": z.string().nullable().optional(),
  "media": z.array(MediaSchema).optional(),
  "weights": TestResultWeightsSchema.optional(),
  "vtg15": VTG15Schema.optional(),
  "testTypes": z.array(TestResultTestTypeSchema),
  "reasonForCreation": z.string().optional(),
  "createdAt": z.union([z.iso.datetime(), z.null()]).optional(),
  "createdByEmailAddress": z.string().optional(),
  "createdByName": z.string().optional(),
  "createdById": z.string().optional(),
  "lastUpdatedAt": z.union([z.iso.datetime(), z.null()]).optional(),
  "lastUpdatedByEmailAddress": z.string().optional(),
  "lastUpdatedByName": z.string().optional(),
  "lastUpdatedById": z.string().optional(),
  "shouldEmailCertificate": z.string().optional(),
  "contingencyTestNumber": z.string().nullable().optional(),
  "typeOfTest": TypeoftestSchema.optional(),
  "source": TestSourcesSchema.optional(),
  "make": z.string().nullable().optional(),
  "model": z.string().nullable().optional(),
  "bodyType": z.object({
  "code": z.string().nullable().optional(),
  "description": z.string().nullable().optional(),
}).strict().optional(),
  "vehicleId": z.string().nullable().optional(),
  "testHistory": z.array(z.lazy(() => TestResultSchema)).optional(),
  "testVersion": z.string().optional(),
  "deletionFlag": z.boolean().optional(),
  "recalls": RecallsSchema.optional(),
}).strict();

export type TestResultSchema = z.infer<typeof TestResultSchema>;
