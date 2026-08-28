import { DB, LOGGER } from '@domain/di-tokens/Tokens';
import { TestResultResponseEnum } from '@domain/enums/TestResultResponse.enum';
import type { PatchMedia } from '@domain/models/PatchMedia';
import type { FindBySystemNumberModel } from '@domain/models/test-results/FindBySystemNumberModel';
import type { FindByTesterStaffIdModel } from '@domain/models/test-results/FindByTesterStaffIdModel';
import { Timed } from '@dvsa/appdev-api-common/http/decorators';
import type { TestResultSchema } from '@dvsa/cvs-type-definitions/types/v1/test-result';
import { and, eq, gte, inArray, lte, sql } from 'drizzle-orm';
import type { SQLWrapper } from 'drizzle-orm/sql/sql';
import { InternalServerError, NotFoundError } from 'routing-controllers';
import { Container, Service } from 'typedi';
import { vehicle } from '../tech-record/schema';
import { testStation } from '../test-facility/schema';
import { testType as testTypeRef } from '../test-types/schema';
import { defectDeficiency, defectItem, defectCategory } from '../defect-reference-data/schema';
import {
    testResult,
    testResultTestType,
    testResultDefect,
    testResultCustomDefect,
    testResultRequiredStandard,
    testResultVehicleSubclass,
    testResultCentralDocsReason,
} from './schema';

@Service()
export class TestResultProvider {
    private readonly logger = Container.get(LOGGER);

    private get db() {
        return Container.get(DB);
    }

    // ─── Reads ───────────────────────────────────────────────────────────────

    @Timed()
    async find(params: FindBySystemNumberModel | FindByTesterStaffIdModel | { vin: string; systemNumber: string }): Promise<TestResultSchema[]> {
        const conditions: (SQLWrapper | undefined)[] = [];

        // Default conditions based on param shape
        if ('testerStaffId' in params && params.testerStaffId) {
            conditions.push(eq(testResult.testerStaffId, params.testerStaffId));
            if ('fromDateTime' in params && params.fromDateTime) {
                conditions.push(gte(testResult.testStartTimestamp, params.fromDateTime));
            }
        } else if ('systemNumber' in params && params.systemNumber) {
            conditions.push(eq(vehicle.systemNumber, params.systemNumber));
        }

        if ('vin' in params && params.vin) {
            conditions.push(eq(vehicle.vin, params.vin));
        }

        // Optional filters (only apply when not already handled above)
        if ('fromDateTime' in params && params.fromDateTime && !('testerStaffId' in params)) {
            conditions.push(gte(testResult.testStartTimestamp, params.fromDateTime));
        }
        if ('toDateTime' in params && params.toDateTime) {
            conditions.push(lte(testResult.testEndTimestamp, params.toDateTime));
        }
        if ('testStationPNumber' in params && params.testStationPNumber) {
            conditions.push(eq(testStation.pNumber, params.testStationPNumber));
        }
        if ('testResultId' in params && params.testResultId) {
            conditions.push(eq(testResult.testResultId, params.testResultId));
        }

        const status = ('status' in params && params.status) || ('testStatus' in params && params.testStatus);

        if (status) {
            conditions.push(eq(testResult.testStatus, status));
        }

        const rows = await this.db
            .select({
                tr: testResult,
                systemNumber: vehicle.systemNumber,
                vin: vehicle.vin,
                testStationName: testStation.name,
                testStationPNumber: testStation.pNumber,
                testStationType: testStation.type,
            })
            .from(testResult)
            .innerJoin(vehicle, eq(testResult.vehicleId, vehicle.id))
            .leftJoin(testStation, eq(testResult.testStationId, testStation.id))
            .where(and(...conditions));

        if (!rows.length) return [];

        return this.assembleResults(rows);
    }

    // ─── Writes ──────────────────────────────────────────────────────────────

    @Timed()
    async insert(
        input: TestResultSchema,
    ): Promise<{ testResultId: string; message: TestResultResponseEnum } | null> {
        // Check for duplicate
        const existing = await this.db
            .select({ id: testResult.id })
            .from(testResult)
            .where(eq(testResult.testResultId, input.testResultId))
            .limit(1);

        if (existing.length) {
            return { testResultId: input.testResultId, message: TestResultResponseEnum.ALREADY_EXISTS };
        }

        const vehicleRow = await this.db
            .select({ id: vehicle.id })
            .from(vehicle)
            .where(eq(vehicle.systemNumber, input.systemNumber))
            .limit(1);

        if (!vehicleRow.length) {
            throw new NotFoundError(`Vehicle not found for systemNumber: ${input.systemNumber}`);
        }

        const testStationRow = input.testStationPNumber
            ? await this.db
                .select({ id: testStation.id })
                .from(testStation)
                .where(eq(testStation.pNumber, input.testStationPNumber))
                .limit(1)
            : [];

        await this.db.transaction(async (tx) => {
            const [trInsert] = await tx.insert(testResult).values({
                testResultId: input.testResultId,
                vehicleId: vehicleRow[0].id,
                testStationId: testStationRow[0]?.id ?? null,
                testerName: input.testerName,
                testerStaffId: input.testerStaffId,
                testerEmailAddress: input.testerEmailAddress,
                testStartTimestamp: input.testStartTimestamp,
                testEndTimestamp: input.testEndTimestamp,
                testStatus: input.testStatus,
                reasonForCancellation: input.reasonForCancellation,
                vehicleType: input.vehicleType,
                vehicleClassCode: input.vehicleClass?.code,
                vehicleClassDescription: input.vehicleClass?.description,
                vehicleConfiguration: input.vehicleConfiguration,
                vehicleSize: input.vehicleSize,
                euVehicleCategory: input.euVehicleCategory,
                countryOfRegistration: input.countryOfRegistration,
                noOfAxles: input.noOfAxles,
                numberOfWheelsDriven: input.numberOfWheelsDriven,
                numberOfSeats: input.numberOfSeats,
                make: input.make,
                model: input.model,
                bodyTypeCode: input.bodyType?.code,
                bodyTypeDescription: input.bodyType?.description,
                odometerReading: input.odometerReading,
                odometerReadingUnits: input.odometerReadingUnits,
                preparerId: input.preparerId,
                preparerName: input.preparerName,
                vrm: input.vrm,
                trailerId: input.trailerId,
                contingencyTestNumber: input.contingencyTestNumber,
                typeOfTest: input.typeOfTest,
                source: input.source,
                testVersion: input.testVersion,
                shouldEmailCertificate: input.shouldEmailCertificate,
                reasonForCreation: input.reasonForCreation,
                deletionFlag: input.deletionFlag,
                createdById: input.createdById,
                createdByName: input.createdByName,
                createdByEmailAddress: input.createdByEmailAddress,
            });

            const testResultPk = trInsert.insertId;

            if (input.vehicleSubclass?.length) {
                await tx.insert(testResultVehicleSubclass).values(
                    input.vehicleSubclass.map((vehicleSubclass) => ({
                        testResultId: testResultPk,
                        vehicleSubclass,
                    })),
                );
            }

            for (const tt of input.testTypes ?? []) {
                const [ttInsert] = await tx.insert(testResultTestType).values({
                    testResultId: testResultPk,
                    testTypeId: tt.testTypeId,
                    testNumber: tt.testNumber,
                    testCode: tt.testCode,
                    certificateNumber: tt.certificateNumber,
                    secondaryCertificateNumber: tt.secondaryCertificateNumber,
                    testTypeStartTimestamp: tt.testTypeStartTimestamp,
                    testTypeEndTimestamp: tt.testTypeEndTimestamp,
                    testResult: tt.testResult,
                    prohibitionIssued: tt.prohibitionIssued,
                    reasonForAbandoning: tt.reasonForAbandoning,
                    additionalNotesRecorded: tt.additionalNotesRecorded,
                    additionalCommentsForAbandon: tt.additionalCommentsForAbandon,
                    testExpiryDate: tt.testExpiryDate,
                    testAnniversaryDate: tt.testAnniversaryDate,
                    reapplicationDate: tt.reapplicationDate,
                    numberOfSeatbeltsFitted: tt.numberOfSeatbeltsFitted,
                    lastSeatbeltInstallationCheckDate: tt.lastSeatbeltInstallationCheckDate,
                    seatbeltInstallationCheckDate: tt.seatbeltInstallationCheckDate,
                    emissionStandard: tt.emissionStandard,
                    fuelType: tt.fuelType,
                    modificationTypeUsed: tt.modificationTypeUsed,
                    smokeTestKLimitApplied: tt.smokeTestKLimitApplied,
                    particulateTrapFitted: tt.particulateTrapFitted,
                    particulateTrapSerialNumber: tt.particulateTrapSerialNumber,
                    modTypeCode: typeof tt.modType === 'object' ? tt.modType?.code : null,
                    modTypeDescription: typeof tt.modType === 'object' ? tt.modType?.description : null,
                    centralDocsIssueRequired: tt.centralDocs?.issueRequired,
                    centralDocsNotes: tt.centralDocs?.notes,
                });

                const ttPk = ttInsert.insertId;

                if (tt.centralDocs?.reasonsForIssue?.length) {
                    await tx.insert(testResultCentralDocsReason).values(
                        tt.centralDocs.reasonsForIssue.map((reason) => ({
                            testResultTestTypeId: ttPk,
                            reason,
                        })),
                    );
                }

                // Insert defects — need to resolve deficiency FK from IM reference
                if (tt.defects?.length) {
                    for (const d of tt.defects) {
                        const deficiencyRow = await tx
                            .select({ id: defectDeficiency.id })
                            .from(defectDeficiency)
                            .innerJoin(defectItem, eq(defectDeficiency.defectItemId, defectItem.id))
                            .innerJoin(defectCategory, eq(defectItem.defectCategoryId, defectCategory.id))
                            .where(
                                and(
                                    eq(defectCategory.imNumber, d.imNumber),
                                    eq(defectItem.itemNumber, d.itemNumber),
                                    eq(defectDeficiency.ref, d.deficiencyRef),
                                ),
                            )
                            .limit(1);

                        if (!deficiencyRow.length) {
                            this.logger.warn('Defect deficiency not found in reference data', {
                                imNumber: d.imNumber,
                                itemNumber: d.itemNumber,
                                deficiencyRef: d.deficiencyRef,
                            });
                            continue;
                        }

                        await tx.insert(testResultDefect).values({
                            testResultTestTypeId: ttPk,
                            defectDeficiencyId: deficiencyRow[0].id,
                            prs: d.prs,
                            prohibitionIssued: d.prohibitionIssued,
                            locationVertical: d.additionalInformation?.location?.vertical,
                            locationHorizontal: d.additionalInformation?.location?.horizontal,
                            locationLateral: d.additionalInformation?.location?.lateral,
                            locationLongitudinal: d.additionalInformation?.location?.longitudinal,
                            locationRowNumber: d.additionalInformation?.location?.rowNumber,
                            locationSeatNumber: d.additionalInformation?.location?.seatNumber,
                            locationAxleNumber: d.additionalInformation?.location?.axleNumber,
                            additionalInformationNotes: d.additionalInformation?.notes,
                        });
                    }
                }

                if (tt.customDefects?.length) {
                    await tx.insert(testResultCustomDefect).values(
                        tt.customDefects.map((cd) => ({
                            testResultTestTypeId: ttPk,
                            referenceNumber: cd.referenceNumber,
                            defectName: cd.defectName,
                            defectNotes: cd.defectNotes,
                        })),
                    );
                }

                if (tt.requiredStandards?.length) {
                    await tx.insert(testResultRequiredStandard).values(
                        tt.requiredStandards.map((rs) => ({
                            testResultTestTypeId: ttPk,
                            sectionNumber: rs.sectionNumber,
                            sectionDescription: rs.sectionDescription,
                            rsNumber: rs.rsNumber,
                            requiredStandard: rs.requiredStandard,
                            refCalculation: rs.refCalculation,
                            additionalInfo: rs.additionalInfo,
                            inspectionTypeBasic: rs.inspectionTypes?.includes('basic') ?? false,
                            inspectionTypeNormal: rs.inspectionTypes?.includes('normal') ?? false,
                            prs: rs.prs,
                        })),
                    );
                }
            }
        });

        return { testResultId: input.testResultId, message: TestResultResponseEnum.CREATED_SUCCESSFULLY };
    }

    @Timed()
    async update(input: TestResultSchema): Promise<string | null> {
        const existing = await this.db
            .select({ id: testResult.id })
            .from(testResult)
            .innerJoin(vehicle, eq(testResult.vehicleId, vehicle.id))
            .where(
                and(
                    eq(vehicle.systemNumber, input.systemNumber),
                    eq(vehicle.vin, input.vin),
                    eq(testResult.testResultId, input.testResultId),
                ),
            )
            .limit(1);

        if (!existing.length) return null;

        const trPk = existing[0].id;

        await this.db.transaction(async (tx) => {
            // Delete existing children then re-insert (replace strategy)
            const ttRows = await tx
                .select({ id: testResultTestType.id })
                .from(testResultTestType)
                .where(eq(testResultTestType.testResultId, trPk));

            const ttIds = ttRows.map((r) => r.id);

            if (ttIds.length) {
                await Promise.all([
                    tx.delete(testResultDefect).where(inArray(testResultDefect.testResultTestTypeId, ttIds)),
                    tx.delete(testResultCustomDefect).where(inArray(testResultCustomDefect.testResultTestTypeId, ttIds)),
                    tx.delete(testResultRequiredStandard).where(inArray(testResultRequiredStandard.testResultTestTypeId, ttIds)),
                    tx.delete(testResultCentralDocsReason).where(inArray(testResultCentralDocsReason.testResultTestTypeId, ttIds)),
                ]);
                await tx.delete(testResultTestType).where(eq(testResultTestType.testResultId, trPk));
            }

            // Update parent row
            await tx
                .update(testResult)
                .set({
                    testerName: input.testerName,
                    testerStaffId: input.testerStaffId,
                    testerEmailAddress: input.testerEmailAddress,
                    testStartTimestamp: input.testStartTimestamp,
                    testEndTimestamp: input.testEndTimestamp,
                    testStatus: input.testStatus,
                    reasonForCancellation: input.reasonForCancellation,
                    deletionFlag: input.deletionFlag,
                    lastUpdatedById: input.lastUpdatedById,
                    lastUpdatedByName: input.lastUpdatedByName,
                    lastUpdatedByEmailAddress: input.lastUpdatedByEmailAddress,
                })
                .where(eq(testResult.id, trPk));

            // Re-insert test types and children
            for (const tt of input.testTypes ?? []) {
                const [ttInsert] = await tx.insert(testResultTestType).values({
                    testResultId: trPk,
                    testTypeId: tt.testTypeId,
                    testNumber: tt.testNumber,
                    testCode: tt.testCode,
                    certificateNumber: tt.certificateNumber,
                    secondaryCertificateNumber: tt.secondaryCertificateNumber,
                    testTypeStartTimestamp: tt.testTypeStartTimestamp,
                    testTypeEndTimestamp: tt.testTypeEndTimestamp,
                    testResult: tt.testResult,
                    prohibitionIssued: tt.prohibitionIssued,
                    reasonForAbandoning: tt.reasonForAbandoning,
                    additionalNotesRecorded: tt.additionalNotesRecorded,
                    additionalCommentsForAbandon: tt.additionalCommentsForAbandon,
                    testExpiryDate: tt.testExpiryDate,
                    testAnniversaryDate: tt.testAnniversaryDate,
                    reapplicationDate: tt.reapplicationDate,
                    numberOfSeatbeltsFitted: tt.numberOfSeatbeltsFitted,
                    lastSeatbeltInstallationCheckDate: tt.lastSeatbeltInstallationCheckDate,
                    seatbeltInstallationCheckDate: tt.seatbeltInstallationCheckDate,
                    emissionStandard: tt.emissionStandard,
                    fuelType: tt.fuelType,
                    modificationTypeUsed: tt.modificationTypeUsed,
                    smokeTestKLimitApplied: tt.smokeTestKLimitApplied,
                    particulateTrapFitted: tt.particulateTrapFitted,
                    particulateTrapSerialNumber: tt.particulateTrapSerialNumber,
                    modTypeCode: typeof tt.modType === 'object' ? tt.modType?.code : null,
                    modTypeDescription: typeof tt.modType === 'object' ? tt.modType?.description : null,
                    centralDocsIssueRequired: tt.centralDocs?.issueRequired,
                    centralDocsNotes: tt.centralDocs?.notes,
                });

                const ttPk = ttInsert.insertId;

                if (tt.centralDocs?.reasonsForIssue?.length) {
                    await tx.insert(testResultCentralDocsReason).values(
                        tt.centralDocs.reasonsForIssue.map((reason) => ({
                            testResultTestTypeId: ttPk,
                            reason,
                        })),
                    );
                }

                if (tt.defects?.length) {
                    for (const d of tt.defects) {
                        const deficiencyRow = await tx
                            .select({ id: defectDeficiency.id })
                            .from(defectDeficiency)
                            .innerJoin(defectItem, eq(defectDeficiency.defectItemId, defectItem.id))
                            .innerJoin(defectCategory, eq(defectItem.defectCategoryId, defectCategory.id))
                            .where(
                                and(
                                    eq(defectCategory.imNumber, d.imNumber),
                                    eq(defectItem.itemNumber, d.itemNumber),
                                    eq(defectDeficiency.ref, d.deficiencyRef),
                                ),
                            )
                            .limit(1);

                        if (!deficiencyRow.length) {
                            this.logger.warn('Defect deficiency not found in reference data', {
                                imNumber: d.imNumber, itemNumber: d.itemNumber, deficiencyRef: d.deficiencyRef,
                            });
                            continue;
                        }

                        await tx.insert(testResultDefect).values({
                            testResultTestTypeId: ttPk,
                            defectDeficiencyId: deficiencyRow[0].id,
                            prs: d.prs,
                            prohibitionIssued: d.prohibitionIssued,
                            locationVertical: d.additionalInformation?.location?.vertical,
                            locationHorizontal: d.additionalInformation?.location?.horizontal,
                            locationLateral: d.additionalInformation?.location?.lateral,
                            locationLongitudinal: d.additionalInformation?.location?.longitudinal,
                            locationRowNumber: d.additionalInformation?.location?.rowNumber,
                            locationSeatNumber: d.additionalInformation?.location?.seatNumber,
                            locationAxleNumber: d.additionalInformation?.location?.axleNumber,
                            additionalInformationNotes: d.additionalInformation?.notes,
                        });
                    }
                }

                if (tt.customDefects?.length) {
                    await tx.insert(testResultCustomDefect).values(
                        tt.customDefects.map((cd) => ({
                            testResultTestTypeId: ttPk,
                            referenceNumber: cd.referenceNumber,
                            defectName: cd.defectName,
                            defectNotes: cd.defectNotes,
                        })),
                    );
                }

                if (tt.requiredStandards?.length) {
                    await tx.insert(testResultRequiredStandard).values(
                        tt.requiredStandards.map((rs) => ({
                            testResultTestTypeId: ttPk,
                            sectionNumber: rs.sectionNumber,
                            sectionDescription: rs.sectionDescription,
                            rsNumber: rs.rsNumber,
                            requiredStandard: rs.requiredStandard,
                            refCalculation: rs.refCalculation,
                            additionalInfo: rs.additionalInfo,
                            inspectionTypeBasic: rs.inspectionTypes?.includes('basic') ?? false,
                            inspectionTypeNormal: rs.inspectionTypes?.includes('normal') ?? false,
                            prs: rs.prs,
                        })),
                    );
                }
            }
        });

        return input.testResultId;
    }

    @Timed()
    async updateMany(testResults: TestResultSchema[]): Promise<void> {
        this.logger.info(`Updating ${testResults.length} test results`);
        await Promise.all(testResults.map((tr) => this.update(tr)));
    }

    @Timed()
    async patchMedia(vin: string, systemNumber: string, testResultID: string, mediaPayload: PatchMedia) {
        // Load the full test result to manipulate in memory, same as DynamoDB approach
        const testResults = await this.find({ vin, systemNumber });

        if (testResults.length === 0) {
            throw new NotFoundError(`Test result not found by VIN/System Num. ${JSON.stringify({ vin, systemNumber })}`);
        }

        const testResultByTRID = testResults.filter((tr) => tr.testResultId === testResultID);

        if (testResultByTRID.length === 0) {
            throw new NotFoundError(
                `Test result not found by VIN/System Num & Test Result ID. ${JSON.stringify({ vin, systemNumber, testResultID })}`,
            );
        }

        if (testResultByTRID.length !== 1) {
            throw new InternalServerError(
                `Multiple test results found by VIN/System Num & Test Result ID. ${JSON.stringify({ vin, systemNumber, testResultID })}`,
            );
        }

        const [testResultRecord] = testResultByTRID;

        this.logger.debug(`Patching record for media with test result ID ${testResultRecord.testResultId}`);

        if (mediaPayload.category === 'approvals') {
            testResultRecord.media = mediaPayload.media.map((m) => ({
                type: m.type,
                path: m.path,
            }));
        } else {
            for (const media of mediaPayload.media) {
                const [, defectPart] = media.path.split('/');
                if (!defectPart) continue;

                const parts = defectPart.split('-');
                const testTypeIndex = Number(parts.at(-2));
                const defectIndex = Number(parts.at(-1));

                if (Number.isNaN(testTypeIndex) || Number.isNaN(defectIndex)) {
                    this.logger.warn('Unable to parse media path indexes', { path: media.path });
                    continue;
                }

                const defect = testResultRecord.testTypes[testTypeIndex]?.defects?.[defectIndex];
                if (!defect?.media?.length) continue;

                const existingFailReasonIndex = defect.media.findIndex(
                    (existingMedia) => existingMedia.path === media.path && existingMedia.type === 'failReason',
                );

                if (existingFailReasonIndex === -1) continue;

                defect.media[existingFailReasonIndex] = { type: media.type, path: media.path };
            }
        }

        // Save back via full update
        await this.update(testResultRecord);

        return testResultRecord;
    }

    // ─── Assembly ────────────────────────────────────────────────────────────

    /**
     * Takes flat test_result rows (with joined vehicle/station data) and
     * loads child test types + their defects/custom defects/required standards,
     * then assembles into TestResultSchema[].
     */
    private async assembleResults(
        rows: {
            tr: typeof testResult.$inferSelect;
            systemNumber: string;
            vin: string;
            testStationName: string | null;
            testStationPNumber: string | null;
            testStationType: string | null;
        }[],
    ): Promise<TestResultSchema[]> {
        const trIds = rows.map((r) => r.tr.id);

        // Batch-load vehicle subclasses for these results
        const subclassRows = await this.db.query.testResultVehicleSubclass.findMany({
            where: inArray(testResultVehicleSubclass.testResultId, trIds),
        });
        const subclassesByResult = Map.groupBy(subclassRows, (r) => r.testResultId);

        // Batch-load all test types for these results, with children
        const types = await this.db.query.testResultTestType.findMany({
            where: inArray(testResultTestType.testResultId, trIds),
            with: {
                defects: {
                    with: {
                        deficiency: {
                            with: {
                                item: {
                                    with: { category: true },
                                },
                            },
                        },
                    },
                },
                customDefects: true,
                requiredStandards: true,
                centralDocsReasons: true,
            },
        });

        // Also load test type reference names
        const testTypeIds = [...new Set(types.map((t) => t.testTypeId))];
        const testTypeRefs = testTypeIds.length
            ? await this.db
                .select({
                    id: testTypeRef.id,
                    name: testTypeRef.name,
                    testTypeName: testTypeRef.testTypeName,
                    testTypeClassification: testTypeRef.testTypeClassification,
                })
                .from(testTypeRef)
                .where(inArray(testTypeRef.id, testTypeIds))
            : [];

        const refMap = new Map(testTypeRefs.map((r) => [r.id, r]));
        const typesByResult = Map.groupBy(types, (t) => t.testResultId);

        return rows.map((row) => {
            const resultTypes = typesByResult.get(row.tr.id) ?? [];

            return {
                testResultId: row.tr.testResultId,
                systemNumber: row.systemNumber,
                vin: row.vin,
                vrm: row.tr.vrm,
                trailerId: row.tr.trailerId,
                testStationName: row.testStationName,
                testStationPNumber: row.testStationPNumber,
                testStationType: row.testStationType,
                testerName: row.tr.testerName,
                testerStaffId: row.tr.testerStaffId,
                testerEmailAddress: row.tr.testerEmailAddress,
                testStartTimestamp: row.tr.testStartTimestamp,
                testEndTimestamp: row.tr.testEndTimestamp,
                testStatus: row.tr.testStatus,
                reasonForCancellation: row.tr.reasonForCancellation,
                vehicleClass: {
                    code: row.tr.vehicleClassCode ?? '',
                    description: row.tr.vehicleClassDescription ?? '',
                },
                vehicleSubclass: (subclassesByResult.get(row.tr.id) ?? []).map((r) => r.vehicleSubclass),
                vehicleType: row.tr.vehicleType,
                vehicleConfiguration: row.tr.vehicleConfiguration,
                vehicleSize: row.tr.vehicleSize,
                euVehicleCategory: row.tr.euVehicleCategory,
                countryOfRegistration: row.tr.countryOfRegistration,
                noOfAxles: row.tr.noOfAxles,
                numberOfWheelsDriven: row.tr.numberOfWheelsDriven,
                numberOfSeats: row.tr.numberOfSeats,
                odometerReading: row.tr.odometerReading,
                odometerReadingUnits: row.tr.odometerReadingUnits,
                preparerId: row.tr.preparerId,
                preparerName: row.tr.preparerName,
                make: row.tr.make,
                model: row.tr.model,
                bodyType: {
                    code: row.tr.bodyTypeCode,
                    description: row.tr.bodyTypeDescription,
                },
                typeOfTest: row.tr.typeOfTest,
                source: row.tr.source,
                contingencyTestNumber: row.tr.contingencyTestNumber,
                testVersion: row.tr.testVersion,
                reasonForCreation: row.tr.reasonForCreation,
                deletionFlag: row.tr.deletionFlag,
                recalls: {
                    hasRecall: row.tr.recallsHasRecall ?? false,
                    manufacturer: row.tr.recallsManufacturer ?? null,
                },
                testTypes: resultTypes.map((tt) => {
                    const ref = refMap.get(tt.testTypeId);

                    return {
                        testTypeId: tt.testTypeId,
                        name: ref?.name ?? '',
                        testTypeName: ref?.testTypeName ?? null,
                        testTypeClassification: ref?.testTypeClassification ?? null,
                        testNumber: tt.testNumber,
                        testCode: tt.testCode,
                        certificateNumber: tt.certificateNumber,
                        secondaryCertificateNumber: tt.secondaryCertificateNumber,
                        testTypeStartTimestamp: tt.testTypeStartTimestamp,
                        testTypeEndTimestamp: tt.testTypeEndTimestamp,
                        testResult: tt.testResult,
                        prohibitionIssued: tt.prohibitionIssued,
                        reasonForAbandoning: tt.reasonForAbandoning,
                        additionalNotesRecorded: tt.additionalNotesRecorded,
                        additionalCommentsForAbandon: tt.additionalCommentsForAbandon,
                        testExpiryDate: tt.testExpiryDate,
                        testAnniversaryDate: tt.testAnniversaryDate,
                        reapplicationDate: tt.reapplicationDate,
                        numberOfSeatbeltsFitted: tt.numberOfSeatbeltsFitted,
                        lastSeatbeltInstallationCheckDate: tt.lastSeatbeltInstallationCheckDate,
                        seatbeltInstallationCheckDate: tt.seatbeltInstallationCheckDate,
                        emissionStandard: tt.emissionStandard,
                        fuelType: tt.fuelType,
                        modificationTypeUsed: tt.modificationTypeUsed,
                        smokeTestKLimitApplied: tt.smokeTestKLimitApplied,
                        particulateTrapFitted: tt.particulateTrapFitted,
                        particulateTrapSerialNumber: tt.particulateTrapSerialNumber,
                        modType: tt.modTypeCode ? { code: tt.modTypeCode, description: tt.modTypeDescription } : null,
                        centralDocs: tt.centralDocsIssueRequired != null
                            ? {
                                issueRequired: tt.centralDocsIssueRequired,
                                notes: tt.centralDocsNotes,
                                reasonsForIssue: tt.centralDocsReasons.map((r) => r.reason),
                            }
                            : undefined,
                        defects: tt.defects.map((d) => ({
                            imNumber: d.deficiency.item.category.imNumber,
                            imDescription: d.deficiency.item.category.imDescription,
                            itemNumber: d.deficiency.item.itemNumber,
                            itemDescription: d.deficiency.item.itemDescription,
                            deficiencyRef: d.deficiency.ref,
                            deficiencyId: d.deficiency.deficiencyId,
                            deficiencySubId: d.deficiency.deficiencySubId,
                            deficiencyCategory: d.deficiency.deficiencyCategory,
                            deficiencyText: d.deficiency.deficiencyText,
                            stdForProhibition: d.deficiency.stdForProhibition,
                            prs: d.prs,
                            prohibitionIssued: d.prohibitionIssued,
                            additionalInformation: {
                                location: {
                                    vertical: d.locationVertical,
                                    horizontal: d.locationHorizontal,
                                    lateral: d.locationLateral,
                                    longitudinal: d.locationLongitudinal,
                                    rowNumber: d.locationRowNumber,
                                    seatNumber: d.locationSeatNumber,
                                    axleNumber: d.locationAxleNumber,
                                },
                                notes: d.additionalInformationNotes ?? '',
                            },
                        })),
                        customDefects: tt.customDefects.map((cd) => ({
                            referenceNumber: cd.referenceNumber,
                            defectName: cd.defectName,
                            defectNotes: cd.defectNotes,
                        })),
                        requiredStandards: tt.requiredStandards.map((rs) => ({
                            sectionNumber: rs.sectionNumber,
                            sectionDescription: rs.sectionDescription,
                            rsNumber: rs.rsNumber,
                            requiredStandard: rs.requiredStandard,
                            refCalculation: rs.refCalculation,
                            additionalInfo: rs.additionalInfo,
                            inspectionTypes: [
                                rs.inspectionTypeBasic ? 'basic' as const : null,
                                rs.inspectionTypeNormal ? 'normal' as const : null,
                            ].filter((t): t is 'basic' | 'normal' => t !== null),
                            prs: rs.prs,
                        })),
                    };
                }),
            } as TestResultSchema;
        });
    }
}
