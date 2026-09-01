import { sql, relations } from 'drizzle-orm';
import {
    bigint,
    boolean,
    date,
    datetime,
    decimal,
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

const schema = mysqlSchema(formatSchemaName('tech_record'));

// ─── Tables ──────────────────────────────────────────────────────────────────

/**
 * @generated-schema-doc
 * Schema: `tech_record` | Table: `vehicle`
 *
 * | Column               | Type            | Nullable | Constraints           |
 * | -------------------- | --------------- | -------- | --------------------- |
 * | id                   | bigint unsigned | No       | PK, AUTO INC          |
 * | systemNumber         | varchar(21)     | No       | NOT NULL, UNIQUE      |
 * | vin                  | varchar(21)     | No       | NOT NULL              |
 * | primaryVrm           | varchar(9)      | Yes      |                       |
 * | trailerId            | varchar(8)      | Yes      |                       |
 * | countryOfRegistration| varchar(50)     | Yes      |                       |
 * | euVehicleCategory    | varchar(10)     | Yes      |                       |
 * | createdById          | varchar(40)     | Yes      |                       |
 * | createdByName        | varchar(200)    | Yes      |                       |
 * | insertedDatetime     | datetime(3)     | Yes      | DEFAULT CURRENT_TS(3) |
 * | lastUpdatedById      | varchar(40)     | Yes      |                       |
 * | lastUpdatedByName    | varchar(200)    | Yes      |                       |
 * | lastUpdatedDatetime  | datetime(3)     | Yes      | DEFAULT CURRENT_TS(3) |
 */
export const vehicle = schema.table(
    'vehicle',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        systemNumber: varchar('system_number', { length: 21 }).notNull(),
        vin: varchar({ length: 21 }).notNull(),
        primaryVrm: varchar('primary_vrm', { length: 9 }),
        trailerId: varchar('trailer_id', { length: 8 }),
        countryOfRegistration: varchar('country_of_registration', { length: 50 }),
        euVehicleCategory: varchar('eu_vehicle_category', { length: 10 }),
        createdById: varchar('created_by_id', { length: 40 }),
        createdByName: varchar('created_by_name', { length: 200 }),
        insertedDatetime: datetime('inserted_datetime', { mode: 'string', fsp: 3 }).default(sql`(CURRENT_TIMESTAMP(3))`),
        lastUpdatedById: varchar('last_updated_by_id', { length: 40 }),
        lastUpdatedByName: varchar('last_updated_by_name', { length: 200 }),
        lastUpdatedDatetime: datetime('last_updated_datetime', { mode: 'string', fsp: 3 }).default(sql`(CURRENT_TIMESTAMP(3))`),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'vehicle_pk' }),
        unique('idx_system_number_uq').on(table.systemNumber),
        index('idx_vin').on(table.vin),
        index('idx_primary_vrm').on(table.primaryVrm),
        index('idx_trailer_id').on(table.trailerId),
    ],
);

/**
 * @generated-schema-doc
 * Schema: `tech_record` | Table: `vehicle_vrm`
 *
 * | Column          | Type            | Nullable | Constraints           |
 * | --------------- | --------------- | -------- | --------------------- |
 * | id              | bigint unsigned | No       | PK, AUTO INC          |
 * | vehicleId       | bigint unsigned | No       | NOT NULL, FK          |
 * | vrm             | varchar(9)      | No       | NOT NULL              |
 * | isPrimary       | boolean         | No       | NOT NULL, DEFAULT 0   |
 * | createdDatetime | datetime(3)     | Yes      | DEFAULT CURRENT_TS(3) |
 */
export const vehicleVrm = schema.table(
    'vehicle_vrm',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        vehicleId: bigint('vehicle_id', { mode: 'number', unsigned: true }).notNull(),
        vrm: varchar({ length: 9 }).notNull(),
        isPrimary: boolean('is_primary').notNull().default(false),
        createdDatetime: datetime('created_datetime', { mode: 'string', fsp: 3 }).default(sql`(CURRENT_TIMESTAMP(3))`),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'vehicle_vrm_pk' }),
        index('idx_vehicle_vrm_vehicle_id').on(table.vehicleId),
        index('idx_vehicle_vrm_vrm').on(table.vrm),
        foreignKey({
            columns: [table.vehicleId],
            foreignColumns: [vehicle.id],
            name: 'fk_vehicle_vrm_vehicle_id',
        }),
    ],
);

/**
 * @generated-schema-doc
 * Schema: `tech_record` | Table: `tech_record`
 *
 * | Column                                    | Type            | Nullable | Constraints           |
 * | ----------------------------------------- | --------------- | -------- | --------------------- |
 * | id                                        | bigint unsigned | No       | PK, AUTO INC          |
 * | vehicleId                                 | bigint unsigned | No       | NOT NULL, FK          |
 * | vehicleType                               | varchar(20)     | No       | NOT NULL              |
 * | statusCode                                | varchar(20)     | No       | NOT NULL              |
 * | reasonForCreation                         | varchar(100)    | No       | NOT NULL              |
 * | recordCompleteness                        | varchar(20)     | Yes      |                       |
 * | hiddenInVta                               | boolean         | Yes      |                       |
 * | updateType                                | varchar(20)     | Yes      |                       |
 * | applicationId                             | varchar(36)     | Yes      |                       |
 * | noOfAxles                                 | int unsigned    | Yes      |                       |
 * | vehicleConfiguration                      | varchar(50)     | Yes      |                       |
 * | euVehicleCategory                         | varchar(10)     | Yes      |                       |
 * | vehicleClassCode                          | varchar(10)     | Yes      |                       |
 * | vehicleClassDescription                   | varchar(100)    | Yes      |                       |
 * | make                                      | varchar(50)     | Yes      |                       |
 * | model                                     | varchar(30)     | Yes      |                       |
 * | bodyTypeCode                              | varchar(10)     | Yes      |                       |
 * | bodyTypeDescription                       | varchar(100)    | Yes      |                       |
 * | regnDate                                  | date            | Yes      |                       |
 * | manufactureYear                            | int unsigned    | Yes      |                       |
 * | manufactureMonth                           | int unsigned    | Yes      |                       |
 * | firstUseDate                              | date            | Yes      |                       |
 * | notes                                     | text            | Yes      |                       |
 * | numberOfWheelsDriven                      | int unsigned    | Yes      |                       |
 * | offRoad                                   | boolean         | Yes      |                       |
 * | vehicleSubclass                           | json            | Yes      |                       |
 * | grossGbWeight                             | int unsigned    | Yes      |                       |
 * | grossDesignWeight                         | int unsigned    | Yes      |                       |
 * | grossEecWeight                            | int unsigned    | Yes      |                       |
 * | grossKerbWeight                           | int unsigned    | Yes      |                       |
 * | grossLadenWeight                          | int unsigned    | Yes      |                       |
 * | unladenWeight                             | int unsigned    | Yes      |                       |
 * | trainGbWeight                             | int unsigned    | Yes      |                       |
 * | trainDesignWeight                         | int unsigned    | Yes      |                       |
 * | trainEecWeight                            | int unsigned    | Yes      |                       |
 * | maxTrainGbWeight                          | int unsigned    | Yes      |                       |
 * | maxTrainDesignWeight                      | int unsigned    | Yes      |                       |
 * | maxTrainEecWeight                         | int unsigned    | Yes      |                       |
 * | dimensionsLength                          | int unsigned    | Yes      |                       |
 * | dimensionsWidth                           | int unsigned    | Yes      |                       |
 * | dimensionsHeight                          | int unsigned    | Yes      |                       |
 * | frontAxleToRearAxle                       | int unsigned    | Yes      |                       |
 * | brakeCode                                 | varchar(6)      | Yes      |                       |
 * | brakeCodeOriginal                         | varchar(6)      | Yes      |                       |
 * | brakesDtpNumber                           | varchar(6)      | Yes      |                       |
 * | brakesLoadSensingValve                    | boolean         | Yes      |                       |
 * | brakesAntilockBrakingSystem               | boolean         | Yes      |                       |
 * | brakesDataTrBrakeOne                      | varchar(60)     | Yes      |                       |
 * | brakesDataTrBrakeTwo                      | varchar(60)     | Yes      |                       |
 * | brakesDataTrBrakeThree                    | varchar(60)     | Yes      |                       |
 * | brakesRetarderBrakeOne                    | varchar(30)     | Yes      |                       |
 * | brakesRetarderBrakeTwo                    | varchar(30)     | Yes      |                       |
 * | brakesParkingBrakeForceA                  | int unsigned    | Yes      |                       |
 * | brakesSecondaryBrakeForceA               | int unsigned    | Yes      |                       |
 * | brakesServiceBrakeForceA                  | int unsigned    | Yes      |                       |
 * | brakesParkingBrakeForceB                  | int unsigned    | Yes      |                       |
 * | brakesSecondaryBrakeForceB               | int unsigned    | Yes      |                       |
 * | brakesServiceBrakeForceB                  | int unsigned    | Yes      |                       |
 * | tyreUseCode                               | varchar(5)      | Yes      |                       |
 * | speedLimiterMrk                           | boolean         | Yes      |                       |
 * | tachoExemptMrk                            | boolean         | Yes      |                       |
 * | roadFriendly                              | boolean         | Yes      |                       |
 * | drawbarCouplingFitted                     | boolean         | Yes      |                       |
 * | frontAxleTo5thWheelMin                    | int unsigned    | Yes      |                       |
 * | frontAxleTo5thWheelMax                    | int unsigned    | Yes      |                       |
 * | frontVehicleTo5thWheelCouplingMin         | int unsigned    | Yes      |                       |
 * | frontVehicleTo5thWheelCouplingMax         | int unsigned    | Yes      |                       |
 * | emissionsLimit                            | decimal(5,2)    | Yes      |                       |
 * | euroStandard                              | varchar(20)     | Yes      |                       |
 * | fuelPropulsionSystem                      | varchar(30)     | Yes      |                       |
 * | seatsLowerDeck                            | int unsigned    | Yes      |                       |
 * | seatsUpperDeck                            | int unsigned    | Yes      |                       |
 * | standingCapacity                          | int unsigned    | Yes      |                       |
 * | numberOfSeatbelts                         | varchar(99)     | Yes      |                       |
 * | seatbeltInstallationApprovalDate          | date            | Yes      |                       |
 * | vehicleSize                               | varchar(20)     | Yes      |                       |
 * | bodyMake                                  | varchar(50)     | Yes      |                       |
 * | bodyModel                                 | varchar(20)     | Yes      |                       |
 * | chassisMake                               | varchar(50)     | Yes      |                       |
 * | chassisModel                              | varchar(20)     | Yes      |                       |
 * | modelLiteral                              | varchar(30)     | Yes      |                       |
 * | speedRestriction                          | decimal(5,2)    | Yes      |                       |
 * | coifSerialNumber                          | varchar(8)      | Yes      |                       |
 * | coifCertifierName                         | varchar(20)     | Yes      |                       |
 * | coifDate                                  | date            | Yes      |                       |
 * | dispensations                             | varchar(160)    | Yes      |                       |
 * | remarks                                   | varchar(1024)   | Yes      |                       |
 * | couplingType                              | varchar(1)      | Yes      |                       |
 * | maxLoadOnCoupling                         | int unsigned    | Yes      |                       |
 * | suspensionType                            | varchar(1)      | Yes      |                       |
 * | rearAxleToRearTrl                         | int unsigned    | Yes      |                       |
 * | couplingCenterToRearAxleMin               | int unsigned    | Yes      |                       |
 * | couplingCenterToRearAxleMax               | int unsigned    | Yes      |                       |
 * | couplingCenterToRearTrlMin                | int unsigned    | Yes      |                       |
 * | couplingCenterToRearTrlMax                | int unsigned    | Yes      |                       |
 * | centreOfRearmostAxleToRearOfTrl           | int             | Yes      |                       |
 * | frameDescription                          | varchar(20)     | Yes      |                       |
 * | batchId                                   | varchar(36)     | Yes      |                       |
 * | authIntoService                           | varchar(100)    | Yes      |                       |
 * | authIntoServiceCocIssueDate               | date            | Yes      |                       |
 * | authIntoServiceDateReceived               | date            | Yes      |                       |
 * | authIntoServiceDatePending                | date            | Yes      |                       |
 * | authIntoServiceDateAuthorised             | date            | Yes      |                       |
 * | authIntoServiceDateRejected               | date            | Yes      |                       |
 * | letterOfAuthLetterType                    | varchar(20)     | Yes      |                       |
 * | letterOfAuthLetterDateRequested           | date            | Yes      |                       |
 * | letterOfAuthParagraphId                   | varchar(10)     | Yes      |                       |
 * | letterOfAuthLetterIssuer                  | varchar(100)    | Yes      |                       |
 * | purchaserDetailsName                      | varchar(150)    | Yes      |                       |
 * | purchaserDetailsAddress1                  | varchar(60)     | Yes      |                       |
 * | purchaserDetailsAddress2                  | varchar(60)     | Yes      |                       |
 * | purchaserDetailsAddress3                  | varchar(60)     | Yes      |                       |
 * | purchaserDetailsPostTown                  | varchar(60)     | Yes      |                       |
 * | purchaserDetailsPostCode                  | varchar(12)     | Yes      |                       |
 * | purchaserDetailsTelephoneNumber           | varchar(25)     | Yes      |                       |
 * | purchaserDetailsEmailAddress              | varchar(255)    | Yes      |                       |
 * | purchaserDetailsFaxNumber                 | varchar(25)     | Yes      |                       |
 * | purchaserDetailsPurchaserNotes            | text            | Yes      |                       |
 * | manufacturerDetailsName                   | varchar(150)    | Yes      |                       |
 * | manufacturerDetailsAddress1               | varchar(60)     | Yes      |                       |
 * | manufacturerDetailsAddress2               | varchar(60)     | Yes      |                       |
 * | manufacturerDetailsAddress3               | varchar(60)     | Yes      |                       |
 * | manufacturerDetailsPostTown               | varchar(60)     | Yes      |                       |
 * | manufacturerDetailsPostCode               | varchar(12)     | Yes      |                       |
 * | manufacturerDetailsTelephoneNumber        | varchar(25)     | Yes      |                       |
 * | manufacturerDetailsEmailAddress           | varchar(255)    | Yes      |                       |
 * | manufacturerDetailsFaxNumber              | varchar(25)     | Yes      |                       |
 * | manufacturerDetailsManufacturerNotes      | text            | Yes      |                       |
 * | approvalType                              | varchar(30)     | Yes      |                       |
 * | approvalTypeNumber                        | varchar(25)     | Yes      |                       |
 * | ntaNumber                                 | varchar(40)     | Yes      |                       |
 * | variantNumber                             | varchar(35)     | Yes      |                       |
 * | variantVersionNumber                      | varchar(35)     | Yes      |                       |
 * | functionCode                              | varchar(1)      | Yes      |                       |
 * | conversionRefNo                           | varchar(10)     | Yes      |                       |
 * | alterationMarker                          | boolean         | Yes      |                       |
 * | departmentalVehicleMarker                 | boolean         | Yes      |                       |
 * | microfilmDocumentType                     | varchar(20)     | Yes      |                       |
 * | microfilmRollNumber                       | varchar(5)      | Yes      |                       |
 * | microfilmSerialNumber                     | varchar(4)      | Yes      |                       |
 * | applicantDetailsName                      | varchar(150)    | Yes      |                       |
 * | applicantDetailsAddress1                  | varchar(60)     | Yes      |                       |
 * | applicantDetailsAddress2                  | varchar(60)     | Yes      |                       |
 * | applicantDetailsAddress3                  | varchar(60)     | Yes      |                       |
 * | applicantDetailsPostTown                  | varchar(60)     | Yes      |                       |
 * | applicantDetailsPostCode                  | varchar(12)     | Yes      |                       |
 * | applicantDetailsTelephoneNumber           | varchar(25)     | Yes      |                       |
 * | applicantDetailsEmailAddress              | varchar(255)    | Yes      |                       |
 * | createdAt                                 | datetime(3)     | Yes      |                       |
 * | createdById                               | varchar(40)     | Yes      |                       |
 * | createdByName                             | varchar(200)    | Yes      |                       |
 * | insertedDatetime                          | datetime(3)     | Yes      | DEFAULT CURRENT_TS(3) |
 * | lastUpdatedAt                             | datetime(3)     | Yes      |                       |
 * | lastUpdatedById                           | varchar(40)     | Yes      |                       |
 * | lastUpdatedByName                         | varchar(200)    | Yes      |                       |
 * | lastUpdatedDatetime                       | datetime(3)     | Yes      | DEFAULT CURRENT_TS(3) |
 */
export const techRecord = schema.table(
    'tech_record',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        vehicleId: bigint('vehicle_id', { mode: 'number', unsigned: true }).notNull(),

        // Identity & status
        vehicleType: varchar('vehicle_type', { length: 20 }).notNull(),
        statusCode: varchar('status_code', { length: 20 }).notNull(),
        reasonForCreation: varchar('reason_for_creation', { length: 100 }).notNull(),
        recordCompleteness: varchar('record_completeness', { length: 20 }),
        hiddenInVta: boolean('hidden_in_vta'),
        updateType: varchar('update_type', { length: 20 }),
        applicationId: varchar('application_id', { length: 36 }),

        // Core shared fields
        noOfAxles: int('no_of_axles', { unsigned: true }),
        vehicleConfiguration: varchar('vehicle_configuration', { length: 50 }),
        euVehicleCategory: varchar('eu_vehicle_category', { length: 10 }),
        vehicleClassCode: varchar('vehicle_class_code', { length: 10 }),
        vehicleClassDescription: varchar('vehicle_class_description', { length: 100 }),
        make: varchar({ length: 50 }),
        model: varchar({ length: 30 }),
        bodyTypeCode: varchar('body_type_code', { length: 10 }),
        bodyTypeDescription: varchar('body_type_description', { length: 100 }),
        regnDate: date('regn_date', { mode: 'string' }),
        manufactureYear: int('manufacture_year', { unsigned: true }),
        manufactureMonth: int('manufacture_month', { unsigned: true }),
        firstUseDate: date('first_use_date', { mode: 'string' }),
        notes: text(),
        numberOfWheelsDriven: int('number_of_wheels_driven', { unsigned: true }),
        offRoad: boolean('off_road'),
        vehicleSubclass: json('vehicle_subclass').$type<string[]>(),

        // Weight fields
        grossGbWeight: int('gross_gb_weight', { unsigned: true }),
        grossDesignWeight: int('gross_design_weight', { unsigned: true }),
        grossEecWeight: int('gross_eec_weight', { unsigned: true }),
        grossKerbWeight: int('gross_kerb_weight', { unsigned: true }),
        grossLadenWeight: int('gross_laden_weight', { unsigned: true }),
        unladenWeight: int('unladen_weight', { unsigned: true }),
        trainGbWeight: int('train_gb_weight', { unsigned: true }),
        trainDesignWeight: int('train_design_weight', { unsigned: true }),
        trainEecWeight: int('train_eec_weight', { unsigned: true }),
        maxTrainGbWeight: int('max_train_gb_weight', { unsigned: true }),
        maxTrainDesignWeight: int('max_train_design_weight', { unsigned: true }),
        maxTrainEecWeight: int('max_train_eec_weight', { unsigned: true }),

        // Dimension fields
        dimensionsLength: int('dimensions_length', { unsigned: true }),
        dimensionsWidth: int('dimensions_width', { unsigned: true }),
        dimensionsHeight: int('dimensions_height', { unsigned: true }),
        frontAxleToRearAxle: int('front_axle_to_rear_axle', { unsigned: true }),

        // Brake fields
        brakeCode: varchar('brake_code', { length: 6 }),
        brakeCodeOriginal: varchar('brake_code_original', { length: 6 }),
        brakesDtpNumber: varchar('brakes_dtp_number', { length: 6 }),
        brakesLoadSensingValve: boolean('brakes_load_sensing_valve'),
        brakesAntilockBrakingSystem: boolean('brakes_antilock_braking_system'),
        brakesDataTrBrakeOne: varchar('brakes_data_tr_brake_one', { length: 60 }),
        brakesDataTrBrakeTwo: varchar('brakes_data_tr_brake_two', { length: 60 }),
        brakesDataTrBrakeThree: varchar('brakes_data_tr_brake_three', { length: 60 }),
        brakesRetarderBrakeOne: varchar('brakes_retarder_brake_one', { length: 30 }),
        brakesRetarderBrakeTwo: varchar('brakes_retarder_brake_two', { length: 30 }),
        brakesParkingBrakeForceA: int('brakes_parking_brake_force_a', { unsigned: true }),
        brakesSecondaryBrakeForceA: int('brakes_secondary_brake_force_a', { unsigned: true }),
        brakesServiceBrakeForceA: int('brakes_service_brake_force_a', { unsigned: true }),
        brakesParkingBrakeForceB: int('brakes_parking_brake_force_b', { unsigned: true }),
        brakesSecondaryBrakeForceB: int('brakes_secondary_brake_force_b', { unsigned: true }),
        brakesServiceBrakeForceB: int('brakes_service_brake_force_b', { unsigned: true }),

        // HGV-specific fields
        tyreUseCode: varchar('tyre_use_code', { length: 5 }),
        speedLimiterMrk: boolean('speed_limiter_mrk'),
        tachoExemptMrk: boolean('tacho_exempt_mrk'),
        roadFriendly: boolean('road_friendly'),
        drawbarCouplingFitted: boolean('drawbar_coupling_fitted'),
        frontAxleTo5thWheelMin: int('front_axle_to_5th_wheel_min', { unsigned: true }),
        frontAxleTo5thWheelMax: int('front_axle_to_5th_wheel_max', { unsigned: true }),
        frontVehicleTo5thWheelCouplingMin: int('front_vehicle_to_5th_wheel_coupling_min', { unsigned: true }),
        frontVehicleTo5thWheelCouplingMax: int('front_vehicle_to_5th_wheel_coupling_max', { unsigned: true }),
        emissionsLimit: decimal('emissions_limit', { precision: 5, scale: 2 }),
        euroStandard: varchar('euro_standard', { length: 20 }),
        fuelPropulsionSystem: varchar('fuel_propulsion_system', { length: 30 }),

        // PSV-specific fields
        seatsLowerDeck: int('seats_lower_deck', { unsigned: true }),
        seatsUpperDeck: int('seats_upper_deck', { unsigned: true }),
        standingCapacity: int('standing_capacity', { unsigned: true }),
        numberOfSeatbelts: varchar('number_of_seatbelts', { length: 99 }),
        seatbeltInstallationApprovalDate: date('seatbelt_installation_approval_date', { mode: 'string' }),
        vehicleSize: varchar('vehicle_size', { length: 20 }),
        bodyMake: varchar('body_make', { length: 50 }),
        bodyModel: varchar('body_model', { length: 20 }),
        chassisMake: varchar('chassis_make', { length: 50 }),
        chassisModel: varchar('chassis_model', { length: 20 }),
        modelLiteral: varchar('model_literal', { length: 30 }),
        speedRestriction: decimal('speed_restriction', { precision: 5, scale: 2 }),
        coifSerialNumber: varchar('coif_serial_number', { length: 8 }),
        coifCertifierName: varchar('coif_certifier_name', { length: 20 }),
        coifDate: date('coif_date', { mode: 'string' }),
        dispensations: varchar({ length: 160 }),
        remarks: varchar({ length: 1024 }),

        // TRL-specific fields
        couplingType: varchar('coupling_type', { length: 1 }),
        maxLoadOnCoupling: int('max_load_on_coupling', { unsigned: true }),
        suspensionType: varchar('suspension_type', { length: 1 }),
        rearAxleToRearTrl: int('rear_axle_to_rear_trl', { unsigned: true }),
        couplingCenterToRearAxleMin: int('coupling_center_to_rear_axle_min', { unsigned: true }),
        couplingCenterToRearAxleMax: int('coupling_center_to_rear_axle_max', { unsigned: true }),
        couplingCenterToRearTrlMin: int('coupling_center_to_rear_trl_min', { unsigned: true }),
        couplingCenterToRearTrlMax: int('coupling_center_to_rear_trl_max', { unsigned: true }),
        centreOfRearmostAxleToRearOfTrl: int('centre_of_rearmost_axle_to_rear_of_trl'),
        frameDescription: varchar('frame_description', { length: 20 }),
        batchId: varchar('batch_id', { length: 36 }),

        // TRL auth into service fields
        authIntoService: varchar('auth_into_service', { length: 100 }),
        authIntoServiceCocIssueDate: date('auth_into_service_coc_issue_date', { mode: 'string' }),
        authIntoServiceDateReceived: date('auth_into_service_date_received', { mode: 'string' }),
        authIntoServiceDatePending: date('auth_into_service_date_pending', { mode: 'string' }),
        authIntoServiceDateAuthorised: date('auth_into_service_date_authorised', { mode: 'string' }),
        authIntoServiceDateRejected: date('auth_into_service_date_rejected', { mode: 'string' }),

        // TRL letter of auth fields
        letterOfAuthLetterType: varchar('letter_of_auth_letter_type', { length: 20 }),
        letterOfAuthLetterDateRequested: date('letter_of_auth_letter_date_requested', { mode: 'string' }),
        letterOfAuthParagraphId: varchar('letter_of_auth_paragraph_id', { length: 10 }),
        letterOfAuthLetterIssuer: varchar('letter_of_auth_letter_issuer', { length: 100 }),

        // TRL purchaser details
        purchaserDetailsName: varchar('purchaser_details_name', { length: 150 }),
        purchaserDetailsAddress1: varchar('purchaser_details_address1', { length: 60 }),
        purchaserDetailsAddress2: varchar('purchaser_details_address2', { length: 60 }),
        purchaserDetailsAddress3: varchar('purchaser_details_address3', { length: 60 }),
        purchaserDetailsPostTown: varchar('purchaser_details_post_town', { length: 60 }),
        purchaserDetailsPostCode: varchar('purchaser_details_post_code', { length: 12 }),
        purchaserDetailsTelephoneNumber: varchar('purchaser_details_telephone_number', { length: 25 }),
        purchaserDetailsEmailAddress: varchar('purchaser_details_email_address', { length: 255 }),
        purchaserDetailsFaxNumber: varchar('purchaser_details_fax_number', { length: 25 }),
        purchaserDetailsPurchaserNotes: text('purchaser_details_purchaser_notes'),

        // TRL manufacturer details
        manufacturerDetailsName: varchar('manufacturer_details_name', { length: 150 }),
        manufacturerDetailsAddress1: varchar('manufacturer_details_address1', { length: 60 }),
        manufacturerDetailsAddress2: varchar('manufacturer_details_address2', { length: 60 }),
        manufacturerDetailsAddress3: varchar('manufacturer_details_address3', { length: 60 }),
        manufacturerDetailsPostTown: varchar('manufacturer_details_post_town', { length: 60 }),
        manufacturerDetailsPostCode: varchar('manufacturer_details_post_code', { length: 12 }),
        manufacturerDetailsTelephoneNumber: varchar('manufacturer_details_telephone_number', { length: 25 }),
        manufacturerDetailsEmailAddress: varchar('manufacturer_details_email_address', { length: 255 }),
        manufacturerDetailsFaxNumber: varchar('manufacturer_details_fax_number', { length: 25 }),
        manufacturerDetailsManufacturerNotes: text('manufacturer_details_manufacturer_notes'),

        // Approval & reference fields
        approvalType: varchar('approval_type', { length: 30 }),
        approvalTypeNumber: varchar('approval_type_number', { length: 25 }),
        ntaNumber: varchar('nta_number', { length: 40 }),
        variantNumber: varchar('variant_number', { length: 35 }),
        variantVersionNumber: varchar('variant_version_number', { length: 35 }),
        functionCode: varchar('function_code', { length: 1 }),
        conversionRefNo: varchar('conversion_ref_no', { length: 10 }),
        alterationMarker: boolean('alteration_marker'),
        departmentalVehicleMarker: boolean('departmental_vehicle_marker'),

        // Microfilm fields
        microfilmDocumentType: varchar('microfilm_document_type', { length: 20 }),
        microfilmRollNumber: varchar('microfilm_roll_number', { length: 5 }),
        microfilmSerialNumber: varchar('microfilm_serial_number', { length: 4 }),

        // Applicant details
        applicantDetailsName: varchar('applicant_details_name', { length: 150 }),
        applicantDetailsAddress1: varchar('applicant_details_address1', { length: 60 }),
        applicantDetailsAddress2: varchar('applicant_details_address2', { length: 60 }),
        applicantDetailsAddress3: varchar('applicant_details_address3', { length: 60 }),
        applicantDetailsPostTown: varchar('applicant_details_post_town', { length: 60 }),
        applicantDetailsPostCode: varchar('applicant_details_post_code', { length: 12 }),
        applicantDetailsTelephoneNumber: varchar('applicant_details_telephone_number', { length: 25 }),
        applicantDetailsEmailAddress: varchar('applicant_details_email_address', { length: 255 }),

        // Audit fields
        createdAt: datetime('created_at', { mode: 'string', fsp: 3 }),
        createdById: varchar('created_by_id', { length: 40 }),
        createdByName: varchar('created_by_name', { length: 200 }),
        insertedDatetime: datetime('inserted_datetime', { mode: 'string', fsp: 3 }).default(sql`(CURRENT_TIMESTAMP(3))`),
        lastUpdatedAt: datetime('last_updated_at', { mode: 'string', fsp: 3 }),
        lastUpdatedById: varchar('last_updated_by_id', { length: 40 }),
        lastUpdatedByName: varchar('last_updated_by_name', { length: 200 }),
        lastUpdatedDatetime: datetime('last_updated_datetime', { mode: 'string', fsp: 3 }).default(sql`(CURRENT_TIMESTAMP(3))`),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'tech_record_pk' }),
        index('idx_tech_record_vehicle_id').on(table.vehicleId),
        index('idx_tech_record_status_code').on(table.statusCode),
        index('idx_tech_record_vehicle_type').on(table.vehicleType),
        foreignKey({
            columns: [table.vehicleId],
            foreignColumns: [vehicle.id],
            name: 'fk_tech_record_vehicle_id',
        }),
    ],
);

/**
 * @generated-schema-doc
 * Schema: `tech_record` | Table: `tech_record_axle`
 *
 * | Column                   | Type            | Nullable | Constraints  |
 * | ------------------------ | --------------- | -------- | ------------ |
 * | id                       | bigint unsigned | No       | PK, AUTO INC |
 * | techRecordId             | bigint unsigned | No       | NOT NULL, FK |
 * | axleNumber               | int unsigned    | Yes      |              |
 * | parkingBrakeMrk          | boolean         | Yes      |              |
 * | weightsGbWeight          | int unsigned    | Yes      |              |
 * | weightsDesignWeight      | int unsigned    | Yes      |              |
 * | weightsEecWeight         | int unsigned    | Yes      |              |
 * | weightsLadenWeight       | int unsigned    | Yes      |              |
 * | weightsKerbWeight        | int unsigned    | Yes      |              |
 * | tyresTyreCode            | int unsigned    | Yes      |              |
 * | tyresTyreSize            | varchar(12)     | Yes      |              |
 * | tyresPlyRating           | varchar(10)     | Yes      |              |
 * | tyresFitmentCode         | varchar(10)     | Yes      |              |
 * | tyresDataTrAxles         | int unsigned    | Yes      |              |
 * | tyresSpeedCategorySymbol | varchar(5)      | Yes      |              |
 * | brakesBrakeActuator      | int unsigned    | Yes      |              |
 * | brakesLeverLength        | int unsigned    | Yes      |              |
 * | brakesSpringBrakeParking | boolean         | Yes      |              |
 */
export const techRecordAxle = schema.table(
    'tech_record_axle',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        techRecordId: bigint('tech_record_id', { mode: 'number', unsigned: true }).notNull(),
        axleNumber: int('axle_number', { unsigned: true }),
        parkingBrakeMrk: boolean('parking_brake_mrk'),
        weightsGbWeight: int('weights_gb_weight', { unsigned: true }),
        weightsDesignWeight: int('weights_design_weight', { unsigned: true }),
        weightsEecWeight: int('weights_eec_weight', { unsigned: true }),
        weightsLadenWeight: int('weights_laden_weight', { unsigned: true }),
        weightsKerbWeight: int('weights_kerb_weight', { unsigned: true }),
        tyresTyreCode: int('tyres_tyre_code', { unsigned: true }),
        tyresTyreSize: varchar('tyres_tyre_size', { length: 12 }),
        tyresPlyRating: varchar('tyres_ply_rating', { length: 10 }),
        tyresFitmentCode: varchar('tyres_fitment_code', { length: 10 }),
        tyresDataTrAxles: int('tyres_data_tr_axles', { unsigned: true }),
        tyresSpeedCategorySymbol: varchar('tyres_speed_category_symbol', { length: 5 }),
        brakesBrakeActuator: int('brakes_brake_actuator', { unsigned: true }),
        brakesLeverLength: int('brakes_lever_length', { unsigned: true }),
        brakesSpringBrakeParking: boolean('brakes_spring_brake_parking'),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'tech_record_axle_pk' }),
        index('idx_axle_tech_record_id').on(table.techRecordId),
        foreignKey({
            columns: [table.techRecordId],
            foreignColumns: [techRecord.id],
            name: 'fk_axle_tech_record_id',
        }),
    ],
);

/**
 * @generated-schema-doc
 * Schema: `tech_record` | Table: `tech_record_plate`
 *
 * | Column             | Type            | Nullable | Constraints  |
 * | ------------------ | --------------- | -------- | ------------ |
 * | id                 | bigint unsigned | No       | PK, AUTO INC |
 * | techRecordId       | bigint unsigned | No       | NOT NULL, FK |
 * | plateSerialNumber  | varchar(36)     | Yes      |              |
 * | plateIssueDate     | date            | Yes      |              |
 * | plateReasonForIssue| varchar(50)     | Yes      |              |
 * | plateIssuer        | varchar(150)    | Yes      |              |
 */
export const techRecordPlate = schema.table(
    'tech_record_plate',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        techRecordId: bigint('tech_record_id', { mode: 'number', unsigned: true }).notNull(),
        plateSerialNumber: varchar('plate_serial_number', { length: 36 }),
        plateIssueDate: date('plate_issue_date', { mode: 'string' }),
        plateReasonForIssue: varchar('plate_reason_for_issue', { length: 50 }),
        plateIssuer: varchar('plate_issuer', { length: 150 }),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'tech_record_plate_pk' }),
        index('idx_plate_tech_record_id').on(table.techRecordId),
        foreignKey({
            columns: [table.techRecordId],
            foreignColumns: [techRecord.id],
            name: 'fk_plate_tech_record_id',
        }),
    ],
);

/**
 * @generated-schema-doc
 * Schema: `tech_record` | Table: `tech_record_dimension_axle_spacing`
 *
 * | Column       | Type            | Nullable | Constraints  |
 * | ------------ | --------------- | -------- | ------------ |
 * | id           | bigint unsigned | No       | PK, AUTO INC |
 * | techRecordId | bigint unsigned | No       | NOT NULL, FK |
 * | axles        | varchar(10)     | No       | NOT NULL     |
 * | value        | int unsigned    | Yes      |              |
 */
export const techRecordDimensionAxleSpacing = schema.table(
    'tech_record_dimension_axle_spacing',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        techRecordId: bigint('tech_record_id', { mode: 'number', unsigned: true }).notNull(),
        axles: varchar({ length: 10 }).notNull(),
        value: int({ unsigned: true }),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'tech_record_dimension_axle_spacing_pk' }),
        index('idx_axle_spacing_tech_record_id').on(table.techRecordId),
        foreignKey({
            columns: [table.techRecordId],
            foreignColumns: [techRecord.id],
            name: 'fk_axle_spacing_tech_record_id',
        }),
    ],
);

/**
 * @generated-schema-doc
 * Schema: `tech_record` | Table: `tech_record_dda`
 *
 * | Column                    | Type            | Nullable | Constraints         |
 * | ------------------------- | --------------- | -------- | ------------------- |
 * | id                        | bigint unsigned | No       | PK, AUTO INC        |
 * | techRecordId              | bigint unsigned | No       | NOT NULL, FK, UQ    |
 * | certificateIssued         | boolean         | Yes      |                     |
 * | wheelchairCapacity        | int unsigned    | Yes      |                     |
 * | wheelchairFittings        | varchar(250)    | Yes      |                     |
 * | wheelchairLiftPresent     | boolean         | Yes      |                     |
 * | wheelchairLiftInformation | varchar(250)    | Yes      |                     |
 * | wheelchairRampPresent     | boolean         | Yes      |                     |
 * | wheelchairRampInformation | varchar(250)    | Yes      |                     |
 * | minEmergencyExits         | int unsigned    | Yes      |                     |
 * | outswing                  | varchar(250)    | Yes      |                     |
 * | ddaSchedules              | varchar(250)    | Yes      |                     |
 * | seatbeltsFitted           | int unsigned    | Yes      |                     |
 * | ddaNotes                  | varchar(1024)   | Yes      |                     |
 */
export const techRecordDda = schema.table(
    'tech_record_dda',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        techRecordId: bigint('tech_record_id', { mode: 'number', unsigned: true }).notNull(),
        certificateIssued: boolean('certificate_issued'),
        wheelchairCapacity: int('wheelchair_capacity', { unsigned: true }),
        wheelchairFittings: varchar('wheelchair_fittings', { length: 250 }),
        wheelchairLiftPresent: boolean('wheelchair_lift_present'),
        wheelchairLiftInformation: varchar('wheelchair_lift_information', { length: 250 }),
        wheelchairRampPresent: boolean('wheelchair_ramp_present'),
        wheelchairRampInformation: varchar('wheelchair_ramp_information', { length: 250 }),
        minEmergencyExits: int('min_emergency_exits', { unsigned: true }),
        outswing: varchar({ length: 250 }),
        ddaSchedules: varchar('dda_schedules', { length: 250 }),
        seatbeltsFitted: int('seatbelts_fitted', { unsigned: true }),
        ddaNotes: varchar('dda_notes', { length: 1024 }),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'tech_record_dda_pk' }),
        unique('idx_dda_tech_record_id_uq').on(table.techRecordId),
        foreignKey({
            columns: [table.techRecordId],
            foreignColumns: [techRecord.id],
            name: 'fk_dda_tech_record_id',
        }),
    ],
);

/**
 * @generated-schema-doc
 * Schema: `tech_record` | Table: `tech_record_adr_detail`
 *
 * | Column                                        | Type            | Nullable | Constraints      |
 * | --------------------------------------------- | --------------- | -------- | ---------------- |
 * | id                                            | bigint unsigned | No       | PK, AUTO INC     |
 * | techRecordId                                  | bigint unsigned | No       | NOT NULL, FK, UQ |
 * | documentId                                    | varchar(36)     | Yes      |                  |
 * | dangerousGoods                                | boolean         | Yes      |                  |
 * | vehicleDetailsType                            | varchar(50)     | Yes      |                  |
 * | vehicleDetailsUsedOnInternationalJourneys     | varchar(10)     | Yes      |                  |
 * | vehicleDetailsApprovalDate                    | date            | Yes      |                  |
 * | permittedDangerousGoods                       | json            | Yes      |                  |
 * | compatibilityGroupJ                           | varchar(10)     | Yes      |                  |
 * | bodyDeclarationType                           | varchar(30)     | Yes      |                  |
 * | applicantDetailsName                          | varchar(150)    | Yes      |                  |
 * | applicantDetailsStreet                        | varchar(150)    | Yes      |                  |
 * | applicantDetailsTown                          | varchar(100)    | Yes      |                  |
 * | applicantDetailsCity                          | varchar(100)    | Yes      |                  |
 * | applicantDetailsPostcode                      | varchar(25)     | Yes      |                  |
 * | memosApply                                    | json            | Yes      |                  |
 * | documents                                     | json            | Yes      |                  |
 * | listStatementApplicable                       | boolean         | Yes      |                  |
 * | batteryListNumber                             | varchar(8)      | Yes      |                  |
 * | brakeDeclarationIssuer                        | varchar(100)    | Yes      |                  |
 * | brakeDeclarationsSeen                         | boolean         | Yes      |                  |
 * | brakeEndurance                                | boolean         | Yes      |                  |
 * | weight                                        | int unsigned    | Yes      |                  |
 * | declarationsSeen                              | boolean         | Yes      |                  |
 * | m145Statement                                 | boolean         | Yes      |                  |
 * | newCertificateRequested                       | boolean         | Yes      |                  |
 * | additionalNotesNumber                         | json            | Yes      |                  |
 * | adrTypeApprovalNo                             | varchar(40)     | Yes      |                  |
 * | adrCertificateNotes                           | varchar(1500)   | Yes      |                  |
 * | tankManufacturer                              | varchar(70)     | Yes      |                  |
 * | tankYearOfManufacture                         | int unsigned    | Yes      |                  |
 * | tankManufacturerSerialNo                      | varchar(50)     | Yes      |                  |
 * | tankTypeAppNo                                 | varchar(65)     | Yes      |                  |
 * | tankCode                                      | varchar(30)     | Yes      |                  |
 * | tankSpecialProvisions                         | varchar(1024)   | Yes      |                  |
 * | tc2Type                                       | varchar(20)     | Yes      |                  |
 * | tc2IntermediateApprovalNo                     | varchar(70)     | Yes      |                  |
 * | tc2IntermediateExpiryDate                     | date            | Yes      |                  |
 * | tankStatementSubstancesPermitted              | varchar(100)    | Yes      |                  |
 * | tankStatementSelect                           | varchar(50)     | Yes      |                  |
 * | tankStatementStatement                        | varchar(1500)   | Yes      |                  |
 * | tankStatementProductListRefNo                 | varchar(100)    | Yes      |                  |
 * | tankStatementProductListUnNo                  | json            | Yes      |                  |
 * | tankStatementProductList                      | varchar(1500)   | Yes      |                  |
 */
export const techRecordAdrDetail = schema.table(
    'tech_record_adr_detail',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        techRecordId: bigint('tech_record_id', { mode: 'number', unsigned: true }).notNull(),

        // Core ADR fields
        documentId: varchar('document_id', { length: 36 }),
        dangerousGoods: boolean('dangerous_goods'),
        vehicleDetailsType: varchar('vehicle_details_type', { length: 50 }),
        vehicleDetailsUsedOnInternationalJourneys: varchar('vehicle_details_used_on_international_journeys', { length: 10 }),
        vehicleDetailsApprovalDate: date('vehicle_details_approval_date', { mode: 'string' }),
        permittedDangerousGoods: json('permitted_dangerous_goods').$type<string[]>(),
        compatibilityGroupJ: varchar('compatibility_group_j', { length: 10 }),
        bodyDeclarationType: varchar('body_declaration_type', { length: 30 }),

        // ADR applicant details
        applicantDetailsName: varchar('applicant_details_name', { length: 150 }),
        applicantDetailsStreet: varchar('applicant_details_street', { length: 150 }),
        applicantDetailsTown: varchar('applicant_details_town', { length: 100 }),
        applicantDetailsCity: varchar('applicant_details_city', { length: 100 }),
        applicantDetailsPostcode: varchar('applicant_details_postcode', { length: 25 }),

        // ADR documentation fields
        memosApply: json('memos_apply').$type<string[]>(),
        documents: json().$type<string[]>(),
        listStatementApplicable: boolean('list_statement_applicable'),
        batteryListNumber: varchar('battery_list_number', { length: 8 }),

        // ADR brake and weight fields
        brakeDeclarationIssuer: varchar('brake_declaration_issuer', { length: 100 }),
        brakeDeclarationsSeen: boolean('brake_declarations_seen'),
        brakeEndurance: boolean('brake_endurance'),
        weight: int({ unsigned: true }),
        declarationsSeen: boolean('declarations_seen'),

        // ADR certification fields
        m145Statement: boolean('m145_statement'),
        newCertificateRequested: boolean('new_certificate_requested'),
        additionalNotesNumber: json('additional_notes_number').$type<string[]>(),
        adrTypeApprovalNo: varchar('adr_type_approval_no', { length: 40 }),
        adrCertificateNotes: varchar('adr_certificate_notes', { length: 1500 }),

        // Tank details
        tankManufacturer: varchar('tank_manufacturer', { length: 70 }),
        tankYearOfManufacture: int('tank_year_of_manufacture', { unsigned: true }),
        tankManufacturerSerialNo: varchar('tank_manufacturer_serial_no', { length: 50 }),
        tankTypeAppNo: varchar('tank_type_app_no', { length: 65 }),
        tankCode: varchar('tank_code', { length: 30 }),
        tankSpecialProvisions: varchar('tank_special_provisions', { length: 1024 }),

        // TC2 details
        tc2Type: varchar('tc2_type', { length: 20 }),
        tc2IntermediateApprovalNo: varchar('tc2_intermediate_approval_no', { length: 70 }),
        tc2IntermediateExpiryDate: date('tc2_intermediate_expiry_date', { mode: 'string' }),

        // Tank statement fields
        tankStatementSubstancesPermitted: varchar('tank_statement_substances_permitted', { length: 100 }),
        tankStatementSelect: varchar('tank_statement_select', { length: 50 }),
        tankStatementStatement: varchar('tank_statement_statement', { length: 1500 }),
        tankStatementProductListRefNo: varchar('tank_statement_product_list_ref_no', { length: 100 }),
        tankStatementProductListUnNo: json('tank_statement_product_list_un_no').$type<string[]>(),
        tankStatementProductList: varchar('tank_statement_product_list', { length: 1500 }),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'tech_record_adr_detail_pk' }),
        unique('idx_adr_detail_tech_record_id_uq').on(table.techRecordId),
        foreignKey({
            columns: [table.techRecordId],
            foreignColumns: [techRecord.id],
            name: 'fk_adr_detail_tech_record_id',
        }),
    ],
);

/**
 * @generated-schema-doc
 * Schema: `tech_record` | Table: `tech_record_adr_tc3`
 *
 * | Column               | Type            | Nullable | Constraints  |
 * | -------------------- | --------------- | -------- | ------------ |
 * | id                   | bigint unsigned | No       | PK, AUTO INC |
 * | adrDetailId          | bigint unsigned | No       | NOT NULL, FK |
 * | tc3Type              | varchar(30)     | Yes      |              |
 * | tc3PeriodicNumber    | varchar(75)     | Yes      |              |
 * | tc3PeriodicExpiryDate| date            | Yes      |              |
 */
export const techRecordAdrTc3 = schema.table(
    'tech_record_adr_tc3',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        adrDetailId: bigint('adr_detail_id', { mode: 'number', unsigned: true }).notNull(),
        tc3Type: varchar('tc3_type', { length: 30 }),
        tc3PeriodicNumber: varchar('tc3_periodic_number', { length: 75 }),
        tc3PeriodicExpiryDate: date('tc3_periodic_expiry_date', { mode: 'string' }),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'tech_record_adr_tc3_pk' }),
        index('idx_tc3_adr_detail_id').on(table.adrDetailId),
        foreignKey({
            columns: [table.adrDetailId],
            foreignColumns: [techRecordAdrDetail.id],
            name: 'fk_tc3_adr_detail_id',
        }),
    ],
);

/**
 * @generated-schema-doc
 * Schema: `tech_record` | Table: `tech_record_adr_pass_certificate`
 *
 * | Column             | Type            | Nullable | Constraints  |
 * | ------------------ | --------------- | -------- | ------------ |
 * | id                 | bigint unsigned | No       | PK, AUTO INC |
 * | techRecordId       | bigint unsigned | No       | NOT NULL, FK |
 * | createdByName      | varchar(200)    | No       | NOT NULL     |
 * | certificateType    | varchar(30)     | No       | NOT NULL     |
 * | generatedTimestamp | datetime(3)     | No       | NOT NULL     |
 * | certificateId      | varchar(36)     | No       | NOT NULL     |
 */
export const techRecordAdrPassCertificate = schema.table(
    'tech_record_adr_pass_certificate',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        techRecordId: bigint('tech_record_id', { mode: 'number', unsigned: true }).notNull(),
        createdByName: varchar('created_by_name', { length: 200 }).notNull(),
        certificateType: varchar('certificate_type', { length: 30 }).notNull(),
        generatedTimestamp: datetime('generated_timestamp', { mode: 'string', fsp: 3 }).notNull(),
        certificateId: varchar('certificate_id', { length: 36 }).notNull(),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'tech_record_adr_pass_certificate_pk' }),
        index('idx_adr_pass_cert_tech_record_id').on(table.techRecordId),
        index('idx_adr_pass_cert_certificate_id').on(table.certificateId),
        foreignKey({
            columns: [table.techRecordId],
            foreignColumns: [techRecord.id],
            name: 'fk_adr_pass_cert_tech_record_id',
        }),
    ],
);

/**
 * @generated-schema-doc
 * Schema: `tech_record` | Table: `tech_record_adr_examiner_note`
 *
 * | Column        | Type            | Nullable | Constraints  |
 * | ------------- | --------------- | -------- | ------------ |
 * | id            | bigint unsigned | No       | PK, AUTO INC |
 * | adrDetailId   | bigint unsigned | No       | NOT NULL, FK |
 * | note          | varchar(1024)   | Yes      |              |
 * | createdAtDate | date            | Yes      |              |
 * | lastUpdatedBy | varchar(200)    | Yes      |              |
 */
export const techRecordAdrExaminerNote = schema.table(
    'tech_record_adr_examiner_note',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        adrDetailId: bigint('adr_detail_id', { mode: 'number', unsigned: true }).notNull(),
        note: varchar({ length: 1024 }),
        createdAtDate: date('created_at_date', { mode: 'string' }),
        lastUpdatedBy: varchar('last_updated_by', { length: 200 }),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'tech_record_adr_examiner_note_pk' }),
        index('idx_examiner_note_adr_detail_id').on(table.adrDetailId),
        foreignKey({
            columns: [table.adrDetailId],
            foreignColumns: [techRecordAdrDetail.id],
            name: 'fk_examiner_note_adr_detail_id',
        }),
    ],
);

// ─── Relations ───────────────────────────────────────────────────────────────

export const vehicleRelations = relations(vehicle, ({ many }) => ({
    vrms: many(vehicleVrm),
    techRecords: many(techRecord),
}));

export const vehicleVrmRelations = relations(vehicleVrm, ({ one }) => ({
    vehicle: one(vehicle, {
        fields: [vehicleVrm.vehicleId],
        references: [vehicle.id],
    }),
}));

export const techRecordRelations = relations(techRecord, ({ one, many }) => ({
    vehicle: one(vehicle, {
        fields: [techRecord.vehicleId],
        references: [vehicle.id],
    }),
    axles: many(techRecordAxle),
    plates: many(techRecordPlate),
    dimensionAxleSpacings: many(techRecordDimensionAxleSpacing),
    dda: one(techRecordDda),
    adrDetail: one(techRecordAdrDetail),
    adrPassCertificates: many(techRecordAdrPassCertificate),
}));

export const techRecordAxleRelations = relations(techRecordAxle, ({ one }) => ({
    techRecord: one(techRecord, {
        fields: [techRecordAxle.techRecordId],
        references: [techRecord.id],
    }),
}));

export const techRecordPlateRelations = relations(techRecordPlate, ({ one }) => ({
    techRecord: one(techRecord, {
        fields: [techRecordPlate.techRecordId],
        references: [techRecord.id],
    }),
}));

export const techRecordDimensionAxleSpacingRelations = relations(techRecordDimensionAxleSpacing, ({ one }) => ({
    techRecord: one(techRecord, {
        fields: [techRecordDimensionAxleSpacing.techRecordId],
        references: [techRecord.id],
    }),
}));

export const techRecordDdaRelations = relations(techRecordDda, ({ one }) => ({
    techRecord: one(techRecord, {
        fields: [techRecordDda.techRecordId],
        references: [techRecord.id],
    }),
}));

export const techRecordAdrDetailRelations = relations(techRecordAdrDetail, ({ one, many }) => ({
    techRecord: one(techRecord, {
        fields: [techRecordAdrDetail.techRecordId],
        references: [techRecord.id],
    }),
    tc3s: many(techRecordAdrTc3),
    examinerNotes: many(techRecordAdrExaminerNote),
}));

export const techRecordAdrTc3Relations = relations(techRecordAdrTc3, ({ one }) => ({
    adrDetail: one(techRecordAdrDetail, {
        fields: [techRecordAdrTc3.adrDetailId],
        references: [techRecordAdrDetail.id],
    }),
}));

export const techRecordAdrPassCertificateRelations = relations(techRecordAdrPassCertificate, ({ one }) => ({
    techRecord: one(techRecord, {
        fields: [techRecordAdrPassCertificate.techRecordId],
        references: [techRecord.id],
    }),
}));

export const techRecordAdrExaminerNoteRelations = relations(techRecordAdrExaminerNote, ({ one }) => ({
    adrDetail: one(techRecordAdrDetail, {
        fields: [techRecordAdrExaminerNote.adrDetailId],
        references: [techRecordAdrDetail.id],
    }),
}));
