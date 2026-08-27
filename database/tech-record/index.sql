CREATE TABLE IF NOT EXISTS `vehicle`
(
    `id`                        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Surrogate key ID',
    `system_number`             VARCHAR(21) NOT NULL COMMENT 'Unique system-generated vehicle identifier',
    `vin`                       VARCHAR(21) NOT NULL COMMENT 'Vehicle Identification Number',
    `primary_vrm`               VARCHAR(9) COMMENT 'Current primary Vehicle Registration Mark',
    `trailer_id`                VARCHAR(8) COMMENT 'Trailer identifier, applicable only to TRL vehicle type',
    `country_of_registration`   VARCHAR(50) COMMENT 'Country in which the vehicle is registered',
    `eu_vehicle_category`       VARCHAR(10) COMMENT 'EU vehicle category classification, e.g. m1, n2, o3, l1e',
    `created_by_id`             VARCHAR(40) COMMENT 'ID of the user that originally created the record',
    `created_by_name`           VARCHAR(200) COMMENT 'Name of user that created the record',
    `inserted_datetime`         DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3) COMMENT 'The Date and Time the record was created',
    `last_updated_by_id`        VARCHAR(40) COMMENT 'ID of the user who last updated the record',
    `last_updated_by_name`      VARCHAR(200) COMMENT 'Name of the user that last updated the record',
    `last_updated_datetime`     DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT 'The Date and Time the record was last updated',
    PRIMARY KEY (`id`),
    UNIQUE INDEX `idx_system_number_uq` (`system_number` ASC) COMMENT 'Enforces uniqueness on the system number and supports efficient lookups',
    INDEX `idx_vin` (`vin` ASC) COMMENT 'Supports efficient VIN lookups',
    INDEX `idx_primary_vrm` (`primary_vrm` ASC) COMMENT 'Supports efficient VRM lookups',
    INDEX `idx_trailer_id` (`trailer_id` ASC) COMMENT 'Supports efficient trailer ID lookups'
)
    ENGINE = InnoDB
    COMMENT = 'Core vehicle record, representing a single vehicle in the CVS system identified by its system number';

CREATE TABLE IF NOT EXISTS `vehicle_vrm`
(
    `id`                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Surrogate key ID',
    `vehicle_id`        BIGINT UNSIGNED NOT NULL COMMENT 'Vehicle surrogate key ID. References `[vehicle].[id]`',
    `vrm`               VARCHAR(9) NOT NULL COMMENT 'Vehicle Registration Mark value',
    `is_primary`        BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Whether this VRM is the current primary registration mark for the vehicle',
    `created_datetime`  DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3) COMMENT 'The Date and Time the VRM record was created',
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_vehicle_vrm_vehicle_id` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`id`),
    INDEX `idx_vehicle_vrm_vehicle_id` (`vehicle_id` ASC) COMMENT 'Supports efficient lookups of all VRMs for a vehicle',
    INDEX `idx_vehicle_vrm_vrm` (`vrm` ASC) COMMENT 'Supports efficient reverse lookups from VRM to vehicle'
)
    ENGINE = InnoDB
    COMMENT = 'Vehicle Registration Mark history, tracking current and historical VRMs for each vehicle including primary designation';


CREATE TABLE IF NOT EXISTS `tech_record`
(
    `id`                                        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Surrogate key ID',
    `vehicle_id`                                BIGINT UNSIGNED NOT NULL COMMENT 'Vehicle surrogate key ID. References `[vehicle].[id]`',

    -- Identity & status
    `vehicle_type`                              VARCHAR(20) NOT NULL COMMENT 'Vehicle type discriminator: hgv, psv, trl, car, lgv, motorcycle, or small trl',
    `status_code`                               VARCHAR(20) NOT NULL COMMENT 'Tech record status, e.g. current, provisional, archived',
    `reason_for_creation`                       VARCHAR(100) NOT NULL COMMENT 'Reason for creating this tech record version',
    `record_completeness`                       VARCHAR(20) COMMENT 'Completeness level of the record, e.g. complete, testable, skeleton',
    `hidden_in_vta`                             BOOLEAN COMMENT 'Whether this tech record is hidden in VTA',
    `update_type`                               VARCHAR(20) COMMENT 'Type of update that created this version',
    `application_id`                            VARCHAR(36) COMMENT 'Application ID linking to an external application',

    -- Core shared fields
    `no_of_axles`                               INT UNSIGNED COMMENT 'Number of axles on the vehicle',
    `vehicle_configuration`                     VARCHAR(50) COMMENT 'Vehicle configuration, e.g. rigid, articulated, centre axle drawbar',
    `eu_vehicle_category`                       VARCHAR(10) COMMENT 'EU vehicle category classification, e.g. m1, n2, o3, l1e',
    `vehicle_class_code`                        VARCHAR(10) COMMENT 'Vehicle class code, e.g. v for HGV, t for trailer, s for small',
    `vehicle_class_description`                 VARCHAR(100) COMMENT 'Vehicle class description, e.g. heavy goods vehicle, trailer',
    `make`                                      VARCHAR(50) COMMENT 'Vehicle make/manufacturer name. HGV/TRL use this; PSV uses chassis_make/body_make',
    `model`                                     VARCHAR(30) COMMENT 'Vehicle model. HGV/TRL use this; PSV uses chassis_model/body_model',
    `body_type_code`                            VARCHAR(10) COMMENT 'Body type code',
    `body_type_description`                     VARCHAR(100) COMMENT 'Body type description',
    `regn_date`                                 DATE COMMENT 'Vehicle registration date',
    `manufacture_year`                          INT UNSIGNED COMMENT 'Year of manufacture',
    `manufacture_month`                         INT UNSIGNED COMMENT 'Month of manufacture, TRL/small TRL only',
    `first_use_date`                            DATE COMMENT 'Date vehicle was first used, TRL only',
    `notes`                                     TEXT COMMENT 'General notes about the tech record',
    `number_of_wheels_driven`                   INT UNSIGNED COMMENT 'Number of driven wheels, applicable to PSV, HGV, motorcycle',
    `off_road`                                  BOOLEAN COMMENT 'Whether the vehicle is off-road, HGV only',
    `vehicle_subclass`                          JSON COMMENT 'JSON array of vehicle subclass values, car/lgv/small TRL only',

    -- Weight fields (shared and type-specific)
    `gross_gb_weight`                           INT UNSIGNED COMMENT 'Gross GB weight in kg',
    `gross_design_weight`                       INT UNSIGNED COMMENT 'Gross design weight in kg',
    `gross_eec_weight`                          INT UNSIGNED COMMENT 'Gross EEC weight in kg',
    `gross_kerb_weight`                         INT UNSIGNED COMMENT 'Gross kerb weight in kg, PSV only',
    `gross_laden_weight`                        INT UNSIGNED COMMENT 'Gross laden weight in kg, PSV only',
    `unladen_weight`                            INT UNSIGNED COMMENT 'Unladen weight in kg, PSV only',
    `train_gb_weight`                           INT UNSIGNED COMMENT 'Train GB weight in kg, HGV only',
    `train_design_weight`                       INT UNSIGNED COMMENT 'Train design weight in kg, HGV/PSV',
    `train_eec_weight`                          INT UNSIGNED COMMENT 'Train EEC weight in kg, HGV only',
    `max_train_gb_weight`                       INT UNSIGNED COMMENT 'Maximum train GB weight in kg, HGV/PSV',
    `max_train_design_weight`                   INT UNSIGNED COMMENT 'Maximum train design weight in kg, HGV only',
    `max_train_eec_weight`                      INT UNSIGNED COMMENT 'Maximum train EEC weight in kg, HGV only',

    -- Dimension fields
    `dimensions_length`                         INT UNSIGNED COMMENT 'Vehicle length in mm',
    `dimensions_width`                          INT UNSIGNED COMMENT 'Vehicle width in mm',
    `dimensions_height`                         INT UNSIGNED COMMENT 'Vehicle height in mm, PSV only',
    `front_axle_to_rear_axle`                   INT UNSIGNED COMMENT 'Distance from front axle to rear axle in mm',

    -- Brake fields (shared across HGV/PSV/TRL)
    `brake_code`                                VARCHAR(6) COMMENT 'Brake code, PSV only',
    `brake_code_original`                       VARCHAR(6) COMMENT 'Original brake code before any updates, PSV only',
    `brakes_dtp_number`                         VARCHAR(6) COMMENT 'DTP number for the braking system',
    `brakes_load_sensing_valve`                 BOOLEAN COMMENT 'Whether a load sensing valve is fitted, HGV/TRL',
    `brakes_antilock_braking_system`            BOOLEAN COMMENT 'Whether an antilock braking system is fitted, TRL only',
    `brakes_data_tr_brake_one`                  VARCHAR(60) COMMENT 'Data TR brake one value, PSV only',
    `brakes_data_tr_brake_two`                  VARCHAR(60) COMMENT 'Data TR brake two value, PSV only',
    `brakes_data_tr_brake_three`                VARCHAR(60) COMMENT 'Data TR brake three value, PSV only',
    `brakes_retarder_brake_one`                 VARCHAR(30) COMMENT 'Retarder brake one type, PSV only',
    `brakes_retarder_brake_two`                 VARCHAR(30) COMMENT 'Retarder brake two type, PSV only',
    `brakes_parking_brake_force_a`              INT UNSIGNED COMMENT 'Parking brake force wheels not locked (A), PSV only',
    `brakes_secondary_brake_force_a`            INT UNSIGNED COMMENT 'Secondary brake force wheels not locked (A), PSV only',
    `brakes_service_brake_force_a`              INT UNSIGNED COMMENT 'Service brake force wheels not locked (A), PSV only',
    `brakes_parking_brake_force_b`              INT UNSIGNED COMMENT 'Parking brake force wheels up to half locked (B), PSV only',
    `brakes_secondary_brake_force_b`            INT UNSIGNED COMMENT 'Secondary brake force wheels up to half locked (B), PSV only',
    `brakes_service_brake_force_b`              INT UNSIGNED COMMENT 'Service brake force wheels up to half locked (B), PSV only',

    -- HGV-specific fields
    `tyre_use_code`                             VARCHAR(5) COMMENT 'Tyre use code, HGV/TRL only',
    `speed_limiter_mrk`                         BOOLEAN COMMENT 'Whether a speed limiter is fitted, HGV/PSV',
    `tacho_exempt_mrk`                          BOOLEAN COMMENT 'Whether the vehicle is tachograph exempt, HGV/PSV',
    `road_friendly`                             BOOLEAN COMMENT 'Whether the vehicle has road-friendly suspension, HGV/TRL',
    `drawbar_coupling_fitted`                   BOOLEAN COMMENT 'Whether a drawbar coupling is fitted, HGV only',
    `front_axle_to_5th_wheel_min`               INT UNSIGNED COMMENT 'Min distance front axle to 5th wheel in mm, HGV only',
    `front_axle_to_5th_wheel_max`               INT UNSIGNED COMMENT 'Max distance front axle to 5th wheel in mm, HGV only',
    `front_vehicle_to_5th_wheel_coupling_min`   INT UNSIGNED COMMENT 'Min distance front vehicle to 5th wheel coupling in mm, HGV only',
    `front_vehicle_to_5th_wheel_coupling_max`   INT UNSIGNED COMMENT 'Max distance front vehicle to 5th wheel coupling in mm, HGV only',
    `emissions_limit`                           DECIMAL(5,2) COMMENT 'Emissions limit value, HGV/PSV',
    `euro_standard`                             VARCHAR(20) COMMENT 'Euro emissions standard, e.g. Euro 3, Euro VI, HGV/PSV',
    `fuel_propulsion_system`                    VARCHAR(30) COMMENT 'Fuel/propulsion system type, e.g. DieselPetrol, Electric, HGV/PSV',

    -- PSV-specific fields
    `seats_lower_deck`                          INT UNSIGNED COMMENT 'Number of seats on the lower deck, PSV only',
    `seats_upper_deck`                          INT UNSIGNED COMMENT 'Number of seats on the upper deck, PSV only',
    `standing_capacity`                         INT UNSIGNED COMMENT 'Standing capacity, PSV only',
    `number_of_seatbelts`                       VARCHAR(99) COMMENT 'Number of seatbelts description, PSV only',
    `seatbelt_installation_approval_date`       DATE COMMENT 'Date seatbelt installation was approved, PSV only',
    `vehicle_size`                              VARCHAR(20) COMMENT 'Vehicle size classification, e.g. small, large, PSV only',
    `body_make`                                 VARCHAR(50) COMMENT 'Body manufacturer, PSV only',
    `body_model`                                VARCHAR(20) COMMENT 'Body model, PSV only',
    `chassis_make`                              VARCHAR(50) COMMENT 'Chassis manufacturer, PSV only',
    `chassis_model`                             VARCHAR(20) COMMENT 'Chassis model, PSV only',
    `model_literal`                             VARCHAR(30) COMMENT 'Model literal description, PSV only',
    `speed_restriction`                         DECIMAL(5,2) COMMENT 'Speed restriction value, PSV only',
    `coif_serial_number`                        VARCHAR(8) COMMENT 'COIF serial number, PSV only',
    `coif_certifier_name`                       VARCHAR(20) COMMENT 'COIF certifier name, PSV only',
    `coif_date`                                 DATE COMMENT 'COIF date, PSV only',
    `dispensations`                             VARCHAR(160) COMMENT 'Dispensations granted, PSV only',
    `remarks`                                   VARCHAR(1024) COMMENT 'Remarks about the tech record, PSV only',

    -- TRL-specific fields
    `coupling_type`                             VARCHAR(1) COMMENT 'Coupling type code, TRL only',
    `max_load_on_coupling`                      INT UNSIGNED COMMENT 'Maximum load on coupling in kg, TRL only',
    `suspension_type`                           VARCHAR(1) COMMENT 'Suspension type code, TRL only',
    `rear_axle_to_rear_trl`                     INT UNSIGNED COMMENT 'Distance rear axle to rear of trailer in mm, TRL only',
    `coupling_center_to_rear_axle_min`          INT UNSIGNED COMMENT 'Min distance coupling center to rear axle in mm, TRL only',
    `coupling_center_to_rear_axle_max`          INT UNSIGNED COMMENT 'Max distance coupling center to rear axle in mm, TRL only',
    `coupling_center_to_rear_trl_min`           INT UNSIGNED COMMENT 'Min distance coupling center to rear of trailer in mm, TRL only',
    `coupling_center_to_rear_trl_max`           INT UNSIGNED COMMENT 'Max distance coupling center to rear of trailer in mm, TRL only',
    `centre_of_rearmost_axle_to_rear_of_trl`   INT COMMENT 'Distance centre of rearmost axle to rear of trailer in mm, TRL only',
    `frame_description`                         VARCHAR(20) COMMENT 'Frame description, TRL only',
    `batch_id`                                  VARCHAR(36) COMMENT 'Batch ID for TRL batch processing, TRL only',

    -- TRL auth into service fields
    `auth_into_service`                         VARCHAR(100) COMMENT 'Auth into service notes, TRL only',
    `auth_into_service_coc_issue_date`          DATE COMMENT 'CoC issue date, TRL only',
    `auth_into_service_date_received`           DATE COMMENT 'Date received for auth into service, TRL only',
    `auth_into_service_date_pending`            DATE COMMENT 'Date pending for auth into service, TRL only',
    `auth_into_service_date_authorised`         DATE COMMENT 'Date authorised for auth into service, TRL only',
    `auth_into_service_date_rejected`           DATE COMMENT 'Date rejected for auth into service, TRL only',

    -- TRL letter of auth fields
    `letter_of_auth_letter_type`                VARCHAR(20) COMMENT 'Letter of authorisation type, TRL only',
    `letter_of_auth_letter_date_requested`      DATE COMMENT 'Date letter of authorisation was requested, TRL only',
    `letter_of_auth_paragraph_id`               VARCHAR(10) COMMENT 'Paragraph ID for letter of authorisation, TRL only',
    `letter_of_auth_letter_issuer`              VARCHAR(100) COMMENT 'Issuer of the letter of authorisation, TRL only',

    -- TRL purchaser details
    `purchaser_details_name`                    VARCHAR(150) COMMENT 'Purchaser name, TRL only',
    `purchaser_details_address1`                VARCHAR(60) COMMENT 'Purchaser address line 1, TRL only',
    `purchaser_details_address2`                VARCHAR(60) COMMENT 'Purchaser address line 2, TRL only',
    `purchaser_details_address3`                VARCHAR(60) COMMENT 'Purchaser address line 3, TRL only',
    `purchaser_details_post_town`               VARCHAR(60) COMMENT 'Purchaser post town, TRL only',
    `purchaser_details_post_code`               VARCHAR(12) COMMENT 'Purchaser post code, TRL only',
    `purchaser_details_telephone_number`        VARCHAR(25) COMMENT 'Purchaser telephone number, TRL only',
    `purchaser_details_email_address`           VARCHAR(255) COMMENT 'Purchaser email address, TRL only',
    `purchaser_details_fax_number`              VARCHAR(25) COMMENT 'Purchaser fax number, TRL only',
    `purchaser_details_purchaser_notes`         TEXT COMMENT 'Purchaser notes, TRL only',

    -- TRL manufacturer details
    `manufacturer_details_name`                 VARCHAR(150) COMMENT 'Manufacturer name, TRL only',
    `manufacturer_details_address1`             VARCHAR(60) COMMENT 'Manufacturer address line 1, TRL only',
    `manufacturer_details_address2`             VARCHAR(60) COMMENT 'Manufacturer address line 2, TRL only',
    `manufacturer_details_address3`             VARCHAR(60) COMMENT 'Manufacturer address line 3, TRL only',
    `manufacturer_details_post_town`            VARCHAR(60) COMMENT 'Manufacturer post town, TRL only',
    `manufacturer_details_post_code`            VARCHAR(12) COMMENT 'Manufacturer post code, TRL only',
    `manufacturer_details_telephone_number`     VARCHAR(25) COMMENT 'Manufacturer telephone number, TRL only',
    `manufacturer_details_email_address`        VARCHAR(255) COMMENT 'Manufacturer email address, TRL only',
    `manufacturer_details_fax_number`           VARCHAR(25) COMMENT 'Manufacturer fax number, TRL only',
    `manufacturer_details_manufacturer_notes`   TEXT COMMENT 'Manufacturer notes, TRL only',

    -- Approval & reference fields
    `approval_type`                             VARCHAR(30) COMMENT 'Approval type, e.g. NTA, ECTA, IVA, NSSTA',
    `approval_type_number`                      VARCHAR(25) COMMENT 'Approval type number',
    `nta_number`                                VARCHAR(40) COMMENT 'National Type Approval number',
    `variant_number`                            VARCHAR(35) COMMENT 'Variant number',
    `variant_version_number`                    VARCHAR(35) COMMENT 'Variant version number',
    `function_code`                             VARCHAR(1) COMMENT 'Function code, single character',
    `conversion_ref_no`                         VARCHAR(10) COMMENT 'Conversion reference number',
    `alteration_marker`                         BOOLEAN COMMENT 'Whether the vehicle has been altered',
    `departmental_vehicle_marker`               BOOLEAN COMMENT 'Whether this is a departmental vehicle',

    -- Microfilm fields
    `microfilm_document_type`                   VARCHAR(20) COMMENT 'Microfilm document type',
    `microfilm_roll_number`                     VARCHAR(5) COMMENT 'Microfilm roll number',
    `microfilm_serial_number`                   VARCHAR(4) COMMENT 'Microfilm serial number',

    -- Applicant details
    `applicant_details_name`                    VARCHAR(150) COMMENT 'Applicant name',
    `applicant_details_address1`                VARCHAR(60) COMMENT 'Applicant address line 1',
    `applicant_details_address2`                VARCHAR(60) COMMENT 'Applicant address line 2',
    `applicant_details_address3`                VARCHAR(60) COMMENT 'Applicant address line 3',
    `applicant_details_post_town`               VARCHAR(60) COMMENT 'Applicant post town',
    `applicant_details_post_code`               VARCHAR(12) COMMENT 'Applicant post code',
    `applicant_details_telephone_number`        VARCHAR(25) COMMENT 'Applicant telephone number',
    `applicant_details_email_address`           VARCHAR(255) COMMENT 'Applicant email address',

    -- Audit fields
    `created_at`                                DATETIME(3) COMMENT 'The Date and Time the tech record was created in the source system',
    `created_by_id`                             VARCHAR(40) COMMENT 'ID of the user that originally created the record',
    `created_by_name`                           VARCHAR(200) COMMENT 'Name of user that created the record',
    `inserted_datetime`                         DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3) COMMENT 'The Date and Time the record was inserted into the database',
    `last_updated_at`                           DATETIME(3) COMMENT 'The Date and Time the tech record was last updated in the source system',
    `last_updated_by_id`                        VARCHAR(40) COMMENT 'ID of the user who last updated the record',
    `last_updated_by_name`                      VARCHAR(200) COMMENT 'Name of the user that last updated the record',
    `last_updated_datetime`                     DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT 'The Date and Time the record was last updated in the database',

    PRIMARY KEY (`id`),
    CONSTRAINT `fk_tech_record_vehicle_id` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`id`),
    INDEX `idx_tech_record_vehicle_id` (`vehicle_id` ASC) COMMENT 'Supports efficient lookups of all tech records for a vehicle',
    INDEX `idx_tech_record_status_code` (`status_code` ASC) COMMENT 'Supports efficient filtering by tech record status',
    INDEX `idx_tech_record_vehicle_type` (`vehicle_type` ASC) COMMENT 'Supports efficient filtering by vehicle type'
)
    ENGINE = InnoDB
    COMMENT = 'Technical record for a vehicle, using a single wide table to hold fields for all vehicle types (hgv, psv, trl, car, lgv, motorcycle, small trl). Type-specific columns are NULL for non-applicable vehicle types.';

CREATE TABLE IF NOT EXISTS `tech_record_axle`
(
    `id`                        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Surrogate key ID',
    `tech_record_id`            BIGINT UNSIGNED NOT NULL COMMENT 'Tech record surrogate key ID. References `[tech_record].[id]`',
    `axle_number`               INT UNSIGNED COMMENT 'Axle number position on the vehicle',
    `parking_brake_mrk`         BOOLEAN COMMENT 'Whether a parking brake is fitted to this axle',
    `weights_gb_weight`         INT UNSIGNED COMMENT 'GB weight for this axle in kg',
    `weights_design_weight`     INT UNSIGNED COMMENT 'Design weight for this axle in kg',
    `weights_eec_weight`        INT UNSIGNED COMMENT 'EEC weight for this axle in kg',
    `weights_laden_weight`      INT UNSIGNED COMMENT 'Laden weight for this axle in kg, PSV/TRL only',
    `weights_kerb_weight`       INT UNSIGNED COMMENT 'Kerb weight for this axle in kg, PSV/TRL only',
    `tyres_tyre_code`           INT UNSIGNED COMMENT 'Tyre code for this axle',
    `tyres_tyre_size`           VARCHAR(12) COMMENT 'Tyre size for this axle',
    `tyres_ply_rating`          VARCHAR(10) COMMENT 'Tyre ply rating',
    `tyres_fitment_code`        VARCHAR(10) COMMENT 'Tyre fitment code, e.g. single, double',
    `tyres_data_tr_axles`       INT UNSIGNED COMMENT 'Data TR axles value',
    `tyres_speed_category_symbol` VARCHAR(5) COMMENT 'Tyre speed category symbol, PSV/TRL only',
    `brakes_brake_actuator`     INT UNSIGNED COMMENT 'Brake actuator value, TRL only',
    `brakes_lever_length`       INT UNSIGNED COMMENT 'Brake lever length, TRL only',
    `brakes_spring_brake_parking` BOOLEAN COMMENT 'Whether spring brake parking is fitted, TRL only',
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_axle_tech_record_id` FOREIGN KEY (`tech_record_id`) REFERENCES `tech_record` (`id`),
    INDEX `idx_axle_tech_record_id` (`tech_record_id` ASC) COMMENT 'Supports efficient lookups of all axles for a tech record'
)
    ENGINE = InnoDB
    COMMENT = 'Axle details for a tech record, capturing weight, tyre, and brake information per axle position';

CREATE TABLE IF NOT EXISTS `tech_record_plate`
(
    `id`                        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Surrogate key ID',
    `tech_record_id`            BIGINT UNSIGNED NOT NULL COMMENT 'Tech record surrogate key ID. References `[tech_record].[id]`',
    `plate_serial_number`       VARCHAR(36) COMMENT 'Serial number of the plate',
    `plate_issue_date`          DATE COMMENT 'Date the plate was issued',
    `plate_reason_for_issue`    VARCHAR(50) COMMENT 'Reason for issuing the plate',
    `plate_issuer`              VARCHAR(150) COMMENT 'Name of the plate issuer',
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_plate_tech_record_id` FOREIGN KEY (`tech_record_id`) REFERENCES `tech_record` (`id`),
    INDEX `idx_plate_tech_record_id` (`tech_record_id` ASC) COMMENT 'Supports efficient lookups of all plates for a tech record'
)
    ENGINE = InnoDB
    COMMENT = 'Ministry plates issued for a tech record, applicable to HGV and TRL vehicle types';

CREATE TABLE IF NOT EXISTS `tech_record_dimension_axle_spacing`
(
    `id`                        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Surrogate key ID',
    `tech_record_id`            BIGINT UNSIGNED NOT NULL COMMENT 'Tech record surrogate key ID. References `[tech_record].[id]`',
    `axles`                     VARCHAR(10) NOT NULL COMMENT 'Axle pair label, e.g. 1-2, 2-3',
    `value`                     INT UNSIGNED COMMENT 'Spacing between the axle pair in mm',
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_axle_spacing_tech_record_id` FOREIGN KEY (`tech_record_id`) REFERENCES `tech_record` (`id`),
    INDEX `idx_axle_spacing_tech_record_id` (`tech_record_id` ASC) COMMENT 'Supports efficient lookups of all axle spacings for a tech record'
)
    ENGINE = InnoDB
    COMMENT = 'Axle spacing dimensions for a tech record, recording the distance between each pair of axles';

CREATE TABLE IF NOT EXISTS `tech_record_dda`
(
    `id`                        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Surrogate key ID',
    `tech_record_id`            BIGINT UNSIGNED NOT NULL COMMENT 'Tech record surrogate key ID. References `[tech_record].[id]`',
    `certificate_issued`        BOOLEAN COMMENT 'Whether a DDA certificate has been issued',
    `wheelchair_capacity`       INT UNSIGNED COMMENT 'Wheelchair capacity of the vehicle',
    `wheelchair_fittings`       VARCHAR(250) COMMENT 'Description of wheelchair fittings',
    `wheelchair_lift_present`   BOOLEAN COMMENT 'Whether a wheelchair lift is present',
    `wheelchair_lift_information` VARCHAR(250) COMMENT 'Information about the wheelchair lift',
    `wheelchair_ramp_present`   BOOLEAN COMMENT 'Whether a wheelchair ramp is present',
    `wheelchair_ramp_information` VARCHAR(250) COMMENT 'Information about the wheelchair ramp',
    `min_emergency_exits`       INT UNSIGNED COMMENT 'Minimum number of emergency exits',
    `outswing`                  VARCHAR(250) COMMENT 'Outswing details',
    `dda_schedules`             VARCHAR(250) COMMENT 'DDA schedules information',
    `seatbelts_fitted`          INT UNSIGNED COMMENT 'Number of seatbelts fitted for DDA purposes',
    `dda_notes`                 VARCHAR(1024) COMMENT 'Additional DDA notes',
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_dda_tech_record_id` FOREIGN KEY (`tech_record_id`) REFERENCES `tech_record` (`id`),
    UNIQUE INDEX `idx_dda_tech_record_id_uq` (`tech_record_id` ASC) COMMENT 'Enforces 1:1 relationship between tech record and DDA details'
)
    ENGINE = InnoDB
    COMMENT = 'Disability Discrimination Act details for a tech record, applicable to PSV vehicle types only. One-to-one relationship with tech_record.';

CREATE TABLE IF NOT EXISTS `tech_record_adr_detail`
(
    `id`                                        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Surrogate key ID',
    `tech_record_id`                            BIGINT UNSIGNED NOT NULL COMMENT 'Tech record surrogate key ID. References `[tech_record].[id]`',

    -- Core ADR fields
    `document_id`                               VARCHAR(36) COMMENT 'ADR document identifier',
    `dangerous_goods`                           BOOLEAN COMMENT 'Whether the vehicle is approved for carrying dangerous goods',
    `vehicle_details_type`                      VARCHAR(50) COMMENT 'ADR vehicle type, e.g. Rigid tank, Semi trailer battery',
    `vehicle_details_used_on_international_journeys` VARCHAR(10) COMMENT 'Whether used on international journeys: yes, no, n/a',
    `vehicle_details_approval_date`             DATE COMMENT 'Date of ADR approval',
    `permitted_dangerous_goods`                 JSON COMMENT 'JSON array of permitted dangerous goods categories',
    `compatibility_group_j`                     VARCHAR(10) COMMENT 'Compatibility group J classification for explosives',
    `body_declaration_type`                     VARCHAR(30) COMMENT 'Body declaration type for ADR',

    -- ADR applicant details (separate from tech_record applicant)
    `applicant_details_name`                    VARCHAR(150) COMMENT 'ADR applicant name',
    `applicant_details_street`                  VARCHAR(150) COMMENT 'ADR applicant street address',
    `applicant_details_town`                    VARCHAR(100) COMMENT 'ADR applicant town',
    `applicant_details_city`                    VARCHAR(100) COMMENT 'ADR applicant city',
    `applicant_details_postcode`                VARCHAR(25) COMMENT 'ADR applicant postcode',

    -- ADR documentation fields
    `memos_apply`                               JSON COMMENT 'JSON array of applicable memos',
    `documents`                                 JSON COMMENT 'JSON array of document references',
    `list_statement_applicable`                 BOOLEAN COMMENT 'Whether the list statement is applicable',
    `battery_list_number`                       VARCHAR(8) COMMENT 'Battery list number, required if list statement applicable',

    -- ADR brake and weight fields
    `brake_declaration_issuer`                  VARCHAR(100) COMMENT 'Issuer of the brake declaration',
    `brake_declarations_seen`                   BOOLEAN COMMENT 'Whether brake declarations have been seen',
    `brake_endurance`                           BOOLEAN COMMENT 'Whether brake endurance testing was performed',
    `weight`                                    INT UNSIGNED COMMENT 'ADR weight in kg, required if brake endurance is true',
    `declarations_seen`                         BOOLEAN COMMENT 'Whether all declarations have been seen',

    -- ADR certification fields
    `m145_statement`                            BOOLEAN COMMENT 'Whether M145 statement applies',
    `new_certificate_requested`                 BOOLEAN COMMENT 'Whether a new certificate has been requested',
    `additional_notes_number`                   JSON COMMENT 'JSON array of additional note numbers',
    `adr_type_approval_no`                      VARCHAR(40) COMMENT 'ADR type approval number',
    `adr_certificate_notes`                     VARCHAR(1500) COMMENT 'Notes on the ADR certificate',
    `application_number`                        VARCHAR(40) COMMENT 'ADR application number',

    -- Tank details
    `tank_manufacturer`                         VARCHAR(70) COMMENT 'Tank manufacturer name',
    `tank_year_of_manufacture`                  INT UNSIGNED COMMENT 'Tank year of manufacture',
    `tank_manufacturer_serial_no`               VARCHAR(50) COMMENT 'Tank manufacturer serial number',
    `tank_type_app_no`                          VARCHAR(65) COMMENT 'Tank type approval number',
    `tank_code`                                 VARCHAR(30) COMMENT 'Tank code',
    `tank_special_provisions`                   VARCHAR(1024) COMMENT 'Tank special provisions',

    -- TC2 details
    `tc2_type`                                  VARCHAR(20) COMMENT 'TC2 inspection type',
    `tc2_intermediate_approval_no`              VARCHAR(70) COMMENT 'TC2 intermediate approval number',
    `tc2_intermediate_expiry_date`              DATE COMMENT 'TC2 intermediate certificate expiry date',

    -- Tank statement fields
    `tank_statement_substances_permitted`       VARCHAR(100) COMMENT 'Substances permitted in the tank',
    `tank_statement_select`                     VARCHAR(50) COMMENT 'Tank statement selection type',
    `tank_statement_statement`                  VARCHAR(1500) COMMENT 'Tank statement text',
    `tank_statement_product_list_ref_no`        VARCHAR(100) COMMENT 'Product list reference number',
    `tank_statement_product_list_un_no`         JSON COMMENT 'JSON array of product list UN numbers',
    `tank_statement_product_list`               VARCHAR(1500) COMMENT 'Product list text',

    PRIMARY KEY (`id`),
    CONSTRAINT `fk_adr_detail_tech_record_id` FOREIGN KEY (`tech_record_id`) REFERENCES `tech_record` (`id`),
    UNIQUE INDEX `idx_adr_detail_tech_record_id_uq` (`tech_record_id` ASC) COMMENT 'Enforces 1:1 relationship between tech record and ADR details'
)
    ENGINE = InnoDB
    COMMENT = 'ADR (dangerous goods) details for a tech record, applicable to HGV, TRL and LGV vehicle types. One-to-one relationship with tech_record.';

CREATE TABLE IF NOT EXISTS `tech_record_adr_tc3`
(
    `id`                        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Surrogate key ID',
    `adr_detail_id`             BIGINT UNSIGNED NOT NULL COMMENT 'ADR detail surrogate key ID. References `[tech_record_adr_detail].[id]`',
    `tc3_type`                  VARCHAR(30) COMMENT 'TC3 inspection type',
    `tc3_periodic_number`       VARCHAR(75) COMMENT 'TC3 periodic inspection certificate number',
    `tc3_periodic_expiry_date`  DATE COMMENT 'TC3 periodic inspection certificate expiry date',
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_tc3_adr_detail_id` FOREIGN KEY (`adr_detail_id`) REFERENCES `tech_record_adr_detail` (`id`),
    INDEX `idx_tc3_adr_detail_id` (`adr_detail_id` ASC) COMMENT 'Supports efficient lookups of all TC3 certificates for an ADR detail'
)
    ENGINE = InnoDB
    COMMENT = 'TC3 periodic inspection certificates for an ADR detail record, one-to-many relationship with tech_record_adr_detail';

CREATE TABLE IF NOT EXISTS `tech_record_adr_pass_certificate`
(
    `id`                        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Surrogate key ID',
    `tech_record_id`            BIGINT UNSIGNED NOT NULL COMMENT 'Tech record surrogate key ID. References `[tech_record].[id]`',
    `created_by_name`           VARCHAR(200) NOT NULL COMMENT 'Name of the user who created the certificate',
    `certificate_type`          VARCHAR(30) NOT NULL COMMENT 'Type of ADR certificate',
    `generated_timestamp`       DATETIME(3) NOT NULL COMMENT 'The Date and Time the certificate was generated',
    `certificate_id`            VARCHAR(36) NOT NULL COMMENT 'Unique certificate identifier',
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_adr_pass_cert_tech_record_id` FOREIGN KEY (`tech_record_id`) REFERENCES `tech_record` (`id`),
    INDEX `idx_adr_pass_cert_tech_record_id` (`tech_record_id` ASC) COMMENT 'Supports efficient lookups of all ADR pass certificates for a tech record',
    INDEX `idx_adr_pass_cert_certificate_id` (`certificate_id` ASC) COMMENT 'Supports efficient lookups by certificate ID'
)
    ENGINE = InnoDB
    COMMENT = 'ADR pass certificates generated for a tech record, one-to-many relationship with tech_record';

CREATE TABLE IF NOT EXISTS `tech_record_adr_examiner_note`
(
    `id`                        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Surrogate key ID',
    `adr_detail_id`             BIGINT UNSIGNED NOT NULL COMMENT 'ADR detail surrogate key ID. References `[tech_record_adr_detail].[id]`',
    `note`                      VARCHAR(1024) COMMENT 'Examiner note text',
    `created_at_date`           DATE COMMENT 'Date the note was created',
    `last_updated_by`           VARCHAR(200) COMMENT 'Name of the user who last updated the note',
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_examiner_note_adr_detail_id` FOREIGN KEY (`adr_detail_id`) REFERENCES `tech_record_adr_detail` (`id`),
    INDEX `idx_examiner_note_adr_detail_id` (`adr_detail_id` ASC) COMMENT 'Supports efficient lookups of all examiner notes for an ADR detail'
)
    ENGINE = InnoDB
    COMMENT = 'Additional examiner notes for an ADR detail record, one-to-many relationship with tech_record_adr_detail';
