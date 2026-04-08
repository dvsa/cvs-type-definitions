CREATE TABLE IF NOT EXISTS `test_station`
(
    `id`                        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Surrogate key ID',
    `dynamics_test_station_id`  VARCHAR(36) COMMENT 'Original Test Station primary key from Dynamics',
    `access_notes`              TEXT COMMENT 'Notes regarding physical access to the station and possible activities',
    `address`                   VARCHAR(100) COMMENT 'Test Station address',
    `contact_number`            VARCHAR(30) COMMENT 'Primary contact number recorded for Test Station in CRM',
    `country`                   VARCHAR(30) COMMENT 'Test Station country',
    `email_addresses_json`      VARCHAR(2000) COMMENT 'JSON stringified array of contact email addresses',
    `general_notes`             TEXT COMMENT 'General notes about the Test Station, such as opening times.',
    `latitude`                  DECIMAL(9,6) COMMENT 'Latitude recorded for Test Station in CRM',
    `longitude`                 DECIMAL(9,6) COMMENT 'Longitude recorded for Test Station in CRM',
    `name`                      VARCHAR(160) COMMENT 'Test Station name',
    `p_number`                  VARCHAR(256) COMMENT 'Test Station P-number',
    `postcode`                  VARCHAR(20) COMMENT 'Test Station post code',
    `status`                    VARCHAR(21) COMMENT 'Test Station status - active/inactive/pending/suggested/terminated/termination requested',
    `town`                      VARCHAR(30) COMMENT 'Test Station town',
    `type`                      VARCHAR(4) COMMENT 'Test Station type, e.g. ATF/GVTS/POTF/HQ/VEF',
    PRIMARY KEY (`id`),
    UNIQUE INDEX `idx_dynamics_test_station_id_uq` (`dynamics_test_station_id` ASC) COMMENT 'Supports more efficient use of the original/source system primary key as a target for UPSERTing',
    INDEX `idx_p_number_idx` (`p_number` ASC) COMMENT 'Supports more efficient searches on the P Number for the test-station service method `getTestStationByPNumber`'
)
    ENGINE = InnoDB
    COMMENT = 'Reference data for ATFs/VEFs/Test Stations replicated from where it is mastered in Dynamics CRM. Varchar lengths chosen to match validation applied in CRM for safety.';

CREATE TABLE IF NOT EXISTS `activity`
(
    `id`                        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Surrogate key ID',
    `activity_uuid`             VARCHAR(36) COMMENT 'Original UUID generated in backend activity service at the time of the creation of the activity.',
    `tester_staff_id`           VARCHAR(40) COMMENT 'ID of the Vehicle Standards Assessor who conducted the test. This field will reference Azure Active Directory',
    `tester_staff_name`         VARCHAR(100) COMMENT 'Name of the Vehicle Standards Assessor',
    `tester_staff_email`        VARCHAR(200) COMMENT 'Email address of the Vehicle Standards Assessor',
    `test_station_id`           BIGINT UNSIGNED NOT NULL COMMENT 'Test station surrogate key ID of the location the test was carried at. References `[test_station].[id]`',
    `parent_activity_id`        BIGINT UNSIGNED COMMENT 'Parent Activity surrogate key ID. References `[activity].[id]`',
    `activity_type`             VARCHAR(50) COMMENT 'Name of the Activity Type performed at an test station',
    `start_datetime`            DATETIME(3) COMMENT 'The Start Date and Time recorded for the Activity',
    `end_datetime`              DATETIME(3) COMMENT 'The End Date and Time recorded for the Activity',
    `wait_reason`               VARCHAR(150) COMMENT 'The reason for any period of time spent not testing that is >5 minutes',
    `notes`                     VARCHAR(500) COMMENT 'General notes about the Activity',
    `closure_reason`            VARCHAR(20) COMMENT 'The reason why an activity was closed',
    `created_by_id`             VARCHAR(40) COMMENT 'ID of the user that originally created the record',
    `created_by_name`           VARCHAR(200) COMMENT 'Name of user that created the record',
    `inserted_datetime`         DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3) COMMENT 'The Date and Time the record was created',
    `last_updated_by_id`        VARCHAR(40) COMMENT 'ID of the user who last updated the record. This field will reference Azure Active Directory',
    `last_updated_by_name`      VARCHAR(200) COMMENT 'Name of the user that last updated the record',
    `last_updated_datetime`     DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT 'The Date and Time the record was last updated',
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_parent_activity_id` FOREIGN KEY (`parent_activity_id`) REFERENCES `activity` (`id`),
    UNIQUE INDEX `idx_activity_uuid_uq` (`activity_uuid` ASC) COMMENT 'Supports upserting against unique property of an individual activity.',
    INDEX `idx_test_station_id` (`test_station_id` ASC) COMMENT 'Index to optimise query performance involving test station data and support more efficient use of the PK as a target for UPSERTing',
    INDEX `idx_tester_staff_id` (`tester_staff_id` ASC) COMMENT 'Index to optimise query performance involving tester staff data and support more efficient use of the PK as a target for UPSERTing',
    INDEX `idx_activity_type`   (`activity_type` ASC) COMMENT 'Index to optimise query performance involving activity type data and support more efficient use of the PK as a target for UPSERTing'
)
    ENGINE = InnoDB
    COMMENT = 'Reference data for Activities replicated from where it is mastered in Dynamics CRM';
