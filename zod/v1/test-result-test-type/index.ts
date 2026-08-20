// AUTO-GENERATED from json-definitions/v1/test-result-test-type/index.json. Do not edit by hand.

import { z } from "zod";

import { TestResultsSchema } from "./../enums/testResult.enum";
import { ModTypeSchema } from "./../mod-type/index.ignore";
import { EmissionStandardsSchema } from "./../enums/emissionStandard.enum";
import { FuelTypeSchema } from "./../enums/fuelType.enum";
import { DefectDetailsSchema } from "./../defect-details/index";
import { SpecialistCustomDefectsSchema } from "./../specialist-custom-defects/index.ignore";
import { SpecialistCustomDefectsSchemaPutSchema } from "./../required-standards/index.ignore";
import { LoadStatusSchema } from "./../load-status/index";

export const TestResultTestTypeSchema = z.object({
  "testTypeName": z.string().nullable(),
  "name": z.string(),
  "testTypeId": z.string(),
  "certificateNumber": z.string().nullable(),
  "secondaryCertificateNumber": z.string().nullable(),
  "testTypeStartTimestamp": z.string().nullable(),
  "testTypeEndTimestamp": z.string().nullable(),
  "testResult": z.union([TestResultsSchema, z.null()]),
  "prohibitionIssued": z.boolean().nullable(),
  "reasonForAbandoning": z.string().nullable(),
  "additionalNotesRecorded": z.string().nullable(),
  "additionalCommentsForAbandon": z.string().nullable(),
  "numberOfSeatbeltsFitted": z.number().int().nullable().optional(),
  "lastSeatbeltInstallationCheckDate": z.string().nullable().optional(),
  "seatbeltInstallationCheckDate": z.boolean().nullable().optional(),
  "testExpiryDate": z.string().optional(),
  "testAnniversaryDate": z.string().nullable().optional(),
  "modType": z.union([ModTypeSchema, z.string(), z.null()]).optional(),
  "emissionStandard": z.union([EmissionStandardsSchema, z.null()]).optional(),
  "fuelType": z.union([FuelTypeSchema, z.null()]).optional(),
  "modificationTypeUsed": z.string().nullable().optional(),
  "smokeTestKLimitApplied": z.string().nullable().optional(),
  "particulateTrapFitted": z.string().nullable().optional(),
  "particulateTrapSerialNumber": z.string().nullable().optional(),
  "defects": z.array(DefectDetailsSchema),
  "customDefects": z.array(SpecialistCustomDefectsSchema).nullable().optional(),
  "requiredStandards": z.array(SpecialistCustomDefectsSchemaPutSchema).optional(),
  "testNumber": z.string().nullable().optional(),
  "reapplicationDate": z.string().nullable().optional(),
  "testCode": z.string().nullable().optional(),
  "lastUpdatedAt": z.union([z.iso.datetime(), z.null()]).optional(),
  "createdAt": z.union([z.iso.datetime(), z.null()]).optional(),
  "testTypeClassification": z.string().nullable().optional(),
  "loadStatus": LoadStatusSchema.optional(),
  "deletionFlag": z.string().nullable().optional(),
  "centralDocs": z.unknown().optional(),
}).strict();

export type TestResultTestTypeSchema = z.infer<typeof TestResultTestTypeSchema>;
