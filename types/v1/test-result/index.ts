import { z } from 'zod';
import {
    emissionStandardEnum,
    euVehicleCategoryEnum,
    fuelTypeEnum,
    inspectionTypeEnum,
    odometerReadingUnitsEnum,
    testResultEnum,
    testSourceEnum,
    testStationTypeEnum,
    testStatusEnum,
    typeOfTestEnum,
    vehicleTypeEnum,
} from '../../enums';
import { defectDetailsSchema } from '../defect-details';
import { mediaSchema } from '../media';

// ─── Composite API schemas ──────────────────────────────────────────────────

export const vehicleClassSchema = z.object({
    code: z.string(),
    description: z.string(),
});

export const bodyTypeSchema = z.object({
    code: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
});

export const modTypeSchema = z.object({
    code: z.string(),
    description: z.string(),
});

export const recallsSchema = z.object({
    hasRecall: z.boolean(),
    manufacturer: z.string().nullable(),
});

export const centralDocsSchema = z.object({
    issueRequired: z.boolean(),
    notes: z.string().optional(),
    reasonsForIssue: z.array(z.string()),
});

export const specialistCustomDefectSchema = z.object({
    referenceNumber: z.string(),
    defectName: z.string(),
    defectNotes: z.string(),
});

export const requiredStandardResultSchema = z.object({
    sectionNumber: z.string(),
    sectionDescription: z.string(),
    rsNumber: z.number(),
    requiredStandard: z.string(),
    refCalculation: z.string(),
    additionalInfo: z.boolean(),
    additionalNotes: z.string().nullable().optional(),
    inspectionTypes: z.array(inspectionTypeEnum).optional(),
    prs: z.boolean(),
});

export const testResultTestTypeResponseSchema = z.object({
    testTypeName: z.string().nullable(),
    name: z.string(),
    testTypeId: z.string(),
    certificateNumber: z.string().nullable(),
    secondaryCertificateNumber: z.string().nullable(),
    testTypeStartTimestamp: z.string().nullable(),
    testTypeEndTimestamp: z.string().nullable(),
    testResult: testResultEnum.nullable(),
    prohibitionIssued: z.boolean().nullable(),
    reasonForAbandoning: z.string().nullable(),
    additionalNotesRecorded: z.string().nullable(),
    additionalCommentsForAbandon: z.string().nullable(),
    numberOfSeatbeltsFitted: z.number().nullable().optional(),
    lastSeatbeltInstallationCheckDate: z.string().nullable().optional(),
    seatbeltInstallationCheckDate: z.boolean().nullable().optional(),
    testExpiryDate: z.string().optional(),
    testAnniversaryDate: z.string().nullable().optional(),
    modType: z.union([modTypeSchema, z.string()]).nullable().optional(),
    emissionStandard: emissionStandardEnum.nullable().optional(),
    fuelType: fuelTypeEnum.nullable().optional(),
    modificationTypeUsed: z.string().nullable().optional(),
    smokeTestKLimitApplied: z.string().nullable().optional(),
    particulateTrapFitted: z.string().nullable().optional(),
    particulateTrapSerialNumber: z.string().nullable().optional(),
    defects: z.array(defectDetailsSchema),
    customDefects: z.array(specialistCustomDefectSchema).nullable().optional(),
    requiredStandards: z.array(requiredStandardResultSchema).optional(),
    testNumber: z.string().nullable().optional(),
    reapplicationDate: z.string().nullable().optional(),
    testCode: z.string().nullable().optional(),
    lastUpdatedAt: z.string().nullable().optional(),
    createdAt: z.string().nullable().optional(),
    testTypeClassification: z.string().nullable().optional(),
    deletionFlag: z.string().nullable().optional(),
    centralDocs: centralDocsSchema.optional(),
});

const baseTestResultFields = {
    testResultId: z.string(),
    testStationName: z.string().nullable(),
    testStationPNumber: z.string().nullable(),
    testStationType: testStationTypeEnum,
    testerName: z.string().nullable(),
    testerStaffId: z.string(),
    testerEmailAddress: z.string().nullable(),
    testStartTimestamp: z.string(),
    testEndTimestamp: z.string(),
    testStatus: testStatusEnum,
    reasonForCancellation: z.string().nullable(),
    systemNumber: z.string(),
    vrm: z.string().optional(),
    trailerId: z.string().optional(),
    vin: z.string(),
    vehicleClass: vehicleClassSchema,
    vehicleSubclass: z.array(z.string()).optional(),
    vehicleType: vehicleTypeEnum,
    vehicleConfiguration: z.string(),
    odometerReading: z.number().nullable().optional(),
    odometerReadingUnits: odometerReadingUnitsEnum.nullable().optional(),
    preparerId: z.string().nullable(),
    preparerName: z.string().nullable(),
    euVehicleCategory: euVehicleCategoryEnum,
    countryOfRegistration: z.string().nullable(),
    noOfAxles: z.number(),
    numberOfWheelsDriven: z.number().nullable(),
    vehicleSize: z.string().optional(),
    numberOfSeats: z.number().optional(),
    regnDate: z.string().nullable().optional(),
    firstUseDate: z.string().nullable().optional(),
    media: z.array(mediaSchema).optional(),
    testTypes: z.array(testResultTestTypeResponseSchema),
    reasonForCreation: z.string().optional(),
    createdAt: z.string().nullable().optional(),
    createdByEmailAddress: z.string().optional(),
    createdByName: z.string().optional(),
    createdById: z.string().optional(),
    lastUpdatedAt: z.string().nullable().optional(),
    lastUpdatedByEmailAddress: z.string().optional(),
    lastUpdatedByName: z.string().optional(),
    lastUpdatedById: z.string().optional(),
    shouldEmailCertificate: z.string().optional(),
    contingencyTestNumber: z.string().nullable().optional(),
    typeOfTest: typeOfTestEnum.optional(),
    source: testSourceEnum.optional(),
    make: z.string().nullable().optional(),
    model: z.string().nullable().optional(),
    bodyType: bodyTypeSchema.optional(),
    vehicleId: z.string().nullable().optional(),
    testVersion: z.string().optional(),
    deletionFlag: z.boolean().optional(),
    recalls: recallsSchema.optional(),
};

const baseTestResultObject = z.object(baseTestResultFields);

export interface TestResultSchema extends z.infer<typeof baseTestResultObject> {
    testHistory?: TestResultSchema[];
}

export const testResultResponseSchema: z.ZodType<TestResultSchema> = z.lazy(() =>
    baseTestResultObject.extend({
        testHistory: z.array(testResultResponseSchema).optional(),
    }),
);
export type TestResultTestTypeSchema = z.infer<typeof testResultTestTypeResponseSchema>;
export type VehicleClassSchema = z.infer<typeof vehicleClassSchema>;
export type BodyTypeSchema = z.infer<typeof bodyTypeSchema>;
export type RecallsSchema = z.infer<typeof recallsSchema>;
