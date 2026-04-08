import { sql, relations } from 'drizzle-orm';
import {
    bigint,
    boolean,
    date,
    datetime,
    foreignKey,
    index,
    int,
    json,
    mysqlSchema,
    primaryKey,
    text,
    unique,
    varchar,
} from 'drizzle-orm/mysql-core';
import { formatSchemaName } from '../helper/format-schema-name';
import { testStation } from '../test-facility/schema';
import { defectDeficiency } from '../defect-reference-data/schema';

const schema = mysqlSchema(formatSchemaName('test_result'));

// ─── Tables ──────────────────────────────────────────────────────────────────

export const testResult = schema.table(
    'test_result',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        testResultId: varchar('test_result_id', { length: 36 }).notNull(),
        vehicleId: bigint('vehicle_id', { mode: 'number', unsigned: true }).notNull(),
        testStationId: bigint('test_station_id', { mode: 'number', unsigned: true }),
        testerName: varchar('tester_name', { length: 60 }),
        testerStaffId: varchar('tester_staff_id', { length: 36 }),
        testerEmailAddress: varchar('tester_email_address', { length: 60 }),
        testStartTimestamp: datetime('test_start_timestamp', { mode: 'string', fsp: 3 }),
        testEndTimestamp: datetime('test_end_timestamp', { mode: 'string', fsp: 3 }),
        testStatus: varchar('test_status', { length: 20 }),
        reasonForCancellation: text('reason_for_cancellation'),
        vehicleType: varchar('vehicle_type', { length: 20 }),
        vehicleClassCode: varchar('vehicle_class_code', { length: 10 }),
        vehicleClassDescription: varchar('vehicle_class_description', { length: 100 }),
        vehicleSubclass: json('vehicle_subclass').$type<string[]>(),
        vehicleConfiguration: varchar('vehicle_configuration', { length: 50 }),
        vehicleSize: varchar('vehicle_size', { length: 20 }),
        euVehicleCategory: varchar('eu_vehicle_category', { length: 10 }),
        countryOfRegistration: varchar('country_of_registration', { length: 50 }),
        noOfAxles: int('no_of_axles', { unsigned: true }),
        numberOfWheelsDriven: int('number_of_wheels_driven', { unsigned: true }),
        numberOfSeats: int('number_of_seats', { unsigned: true }),
        regnDate: date('regn_date', { mode: 'string' }),
        firstUseDate: date('first_use_date', { mode: 'string' }),
        make: varchar({ length: 50 }),
        model: varchar({ length: 30 }),
        bodyTypeCode: varchar('body_type_code', { length: 10 }),
        bodyTypeDescription: varchar('body_type_description', { length: 100 }),
        odometerReading: int('odometer_reading', { unsigned: true }),
        odometerReadingUnits: varchar('odometer_reading_units', { length: 20 }),
        preparerId: varchar('preparer_id', { length: 36 }),
        preparerName: varchar('preparer_name', { length: 150 }),
        vrm: varchar({ length: 9 }),
        trailerId: varchar('trailer_id', { length: 8 }),
        contingencyTestNumber: varchar('contingency_test_number', { length: 8 }),
        typeOfTest: varchar('type_of_test', { length: 20 }),
        source: varchar({ length: 10 }),
        vehicleIdField: varchar('vehicle_id_field', { length: 36 }),
        testVersion: varchar('test_version', { length: 10 }),
        shouldEmailCertificate: varchar('should_email_certificate', { length: 10 }),
        reasonForCreation: varchar('reason_for_creation', { length: 100 }),
        recallsHasRecall: boolean('recalls_has_recall'),
        recallsManufacturer: varchar('recalls_manufacturer', { length: 100 }),
        deletionFlag: boolean('deletion_flag'),
        createdById: varchar('created_by_id', { length: 40 }),
        createdByName: varchar('created_by_name', { length: 200 }),
        createdByEmailAddress: varchar('created_by_email_address', { length: 255 }),
        insertedDatetime: datetime('inserted_datetime', { mode: 'string', fsp: 3 }).default(sql`(CURRENT_TIMESTAMP(3))`),
        lastUpdatedById: varchar('last_updated_by_id', { length: 40 }),
        lastUpdatedByName: varchar('last_updated_by_name', { length: 200 }),
        lastUpdatedByEmailAddress: varchar('last_updated_by_email_address', { length: 255 }),
        lastUpdatedDatetime: datetime('last_updated_datetime', { mode: 'string', fsp: 3 }).default(sql`(CURRENT_TIMESTAMP(3))`),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'test_result_pk' }),
        unique('idx_test_result_id_uq').on(table.testResultId),
        index('idx_test_result_vehicle_id').on(table.vehicleId),
        index('idx_test_result_test_station_id').on(table.testStationId),
        index('idx_test_result_tester_staff_id').on(table.testerStaffId),
    ],
);

export const testResultTestType = schema.table(
    'test_result_test_type',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        testResultId: bigint('test_result_id', { mode: 'number', unsigned: true }).notNull(),
        testTypeId: varchar('test_type_id', { length: 10 }).notNull(),
        testNumber: varchar('test_number', { length: 36 }),
        testCode: varchar('test_code', { length: 10 }),
        certificateNumber: varchar('certificate_number', { length: 36 }),
        secondaryCertificateNumber: varchar('secondary_certificate_number', { length: 36 }),
        testTypeStartTimestamp: datetime('test_type_start_timestamp', { mode: 'string', fsp: 3 }),
        testTypeEndTimestamp: datetime('test_type_end_timestamp', { mode: 'string', fsp: 3 }),
        testResult: varchar('test_result', { length: 20 }),
        prohibitionIssued: boolean('prohibition_issued'),
        reasonForAbandoning: text('reason_for_abandoning'),
        additionalNotesRecorded: varchar('additional_notes_recorded', { length: 500 }),
        additionalCommentsForAbandon: varchar('additional_comments_for_abandon', { length: 500 }),
        testExpiryDate: date('test_expiry_date', { mode: 'string' }),
        testAnniversaryDate: date('test_anniversary_date', { mode: 'string' }),
        reapplicationDate: date('reapplication_date', { mode: 'string' }),
        numberOfSeatbeltsFitted: int('number_of_seatbelts_fitted', { unsigned: true }),
        lastSeatbeltInstallationCheckDate: date('last_seatbelt_installation_check_date', { mode: 'string' }),
        seatbeltInstallationCheckDate: boolean('seatbelt_installation_check_date'),
        emissionStandard: varchar('emission_standard', { length: 50 }),
        fuelType: varchar('fuel_type', { length: 30 }),
        modificationTypeUsed: varchar('modification_type_used', { length: 100 }),
        smokeTestKLimitApplied: varchar('smoke_test_k_limit_applied', { length: 100 }),
        particulateTrapFitted: varchar('particulate_trap_fitted', { length: 100 }),
        particulateTrapSerialNumber: varchar('particulate_trap_serial_number', { length: 100 }),
        modTypeCode: varchar('mod_type_code', { length: 10 }),
        modTypeDescription: varchar('mod_type_description', { length: 100 }),
        centralDocsIssueRequired: boolean('central_docs_issue_required'),
        centralDocsNotes: text('central_docs_notes'),
        centralDocsReasonsForIssue: json('central_docs_reasons_for_issue').$type<string[]>(),
        deletionFlag: varchar('deletion_flag', { length: 10 }),
        createdAt: datetime('created_at', { mode: 'string', fsp: 3 }),
        lastUpdatedAt: datetime('last_updated_at', { mode: 'string', fsp: 3 }),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'test_result_test_type_pk' }),
        index('idx_test_type_test_result_id').on(table.testResultId),
        index('idx_test_type_test_type_id').on(table.testTypeId),
        index('idx_test_type_test_number').on(table.testNumber),
        index('idx_test_type_certificate_number').on(table.certificateNumber),
        foreignKey({
            columns: [table.testResultId],
            foreignColumns: [testResult.id],
            name: 'fk_test_type_test_result_id',
        }),
    ],
);

export const testResultDefect = schema.table(
    'test_result_defect',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        testResultTestTypeId: bigint('test_result_test_type_id', { mode: 'number', unsigned: true }).notNull(),
        defectDeficiencyId: bigint('defect_deficiency_id', { mode: 'number', unsigned: true }).notNull(),
        prs: boolean(),
        prohibitionIssued: boolean('prohibition_issued'),
        locationVertical: varchar('location_vertical', { length: 20 }),
        locationHorizontal: varchar('location_horizontal', { length: 20 }),
        locationLateral: varchar('location_lateral', { length: 20 }),
        locationLongitudinal: varchar('location_longitudinal', { length: 20 }),
        locationRowNumber: int('location_row_number', { unsigned: true }),
        locationSeatNumber: int('location_seat_number', { unsigned: true }),
        locationAxleNumber: int('location_axle_number', { unsigned: true }),
        additionalInformationNotes: text('additional_information_notes'),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'test_result_defect_pk' }),
        index('idx_defect_test_type_id').on(table.testResultTestTypeId),
        index('idx_defect_deficiency_id').on(table.defectDeficiencyId),
        foreignKey({
            columns: [table.testResultTestTypeId],
            foreignColumns: [testResultTestType.id],
            name: 'fk_defect_test_type_id',
        }),
        foreignKey({
            columns: [table.defectDeficiencyId],
            foreignColumns: [defectDeficiency.id],
            name: 'fk_defect_deficiency_id',
        }),
    ],
);

export const testResultCustomDefect = schema.table(
    'test_result_custom_defect',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        testResultTestTypeId: bigint('test_result_test_type_id', { mode: 'number', unsigned: true }).notNull(),
        referenceNumber: varchar('reference_number', { length: 50 }).notNull(),
        defectName: varchar('defect_name', { length: 500 }).notNull(),
        defectNotes: text('defect_notes').notNull(),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'test_result_custom_defect_pk' }),
        index('idx_custom_defect_test_type_id').on(table.testResultTestTypeId),
        foreignKey({
            columns: [table.testResultTestTypeId],
            foreignColumns: [testResultTestType.id],
            name: 'fk_custom_defect_test_type_id',
        }),
    ],
);

export const testResultRequiredStandard = schema.table(
    'test_result_required_standard',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        testResultTestTypeId: bigint('test_result_test_type_id', { mode: 'number', unsigned: true }).notNull(),
        sectionNumber: varchar('section_number', { length: 20 }).notNull(),
        sectionDescription: varchar('section_description', { length: 500 }).notNull(),
        rsNumber: int('rs_number', { unsigned: true }).notNull(),
        requiredStandard: varchar('required_standard', { length: 500 }).notNull(),
        refCalculation: varchar('ref_calculation', { length: 100 }).notNull(),
        additionalInfo: boolean('additional_info').notNull(),
        additionalNotes: text('additional_notes'),
        inspectionTypes: json('inspection_types').$type<string[]>(),
        prs: boolean().notNull(),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'test_result_required_standard_pk' }),
        index('idx_required_standard_test_type_id').on(table.testResultTestTypeId),
        foreignKey({
            columns: [table.testResultTestTypeId],
            foreignColumns: [testResultTestType.id],
            name: 'fk_required_standard_test_type_id',
        }),
    ],
);

// ─── Relations ───────────────────────────────────────────────────────────────

export const testResultRelations = relations(testResult, ({ many }) => ({
    testTypes: many(testResultTestType),
}));

export const testResultTestTypeRelations = relations(testResultTestType, ({ one, many }) => ({
    testResult: one(testResult, {
        fields: [testResultTestType.testResultId],
        references: [testResult.id],
    }),
    defects: many(testResultDefect),
    customDefects: many(testResultCustomDefect),
    requiredStandards: many(testResultRequiredStandard),
}));

export const testResultDefectRelations = relations(testResultDefect, ({ one }) => ({
    testType: one(testResultTestType, {
        fields: [testResultDefect.testResultTestTypeId],
        references: [testResultTestType.id],
    }),
    deficiency: one(defectDeficiency, {
        fields: [testResultDefect.defectDeficiencyId],
        references: [defectDeficiency.id],
    }),
}));

export const testResultCustomDefectRelations = relations(testResultCustomDefect, ({ one }) => ({
    testType: one(testResultTestType, {
        fields: [testResultCustomDefect.testResultTestTypeId],
        references: [testResultTestType.id],
    }),
}));

export const testResultRequiredStandardRelations = relations(testResultRequiredStandard, ({ one }) => ({
    testType: one(testResultTestType, {
        fields: [testResultRequiredStandard.testResultTestTypeId],
        references: [testResultTestType.id],
    }),
}));
