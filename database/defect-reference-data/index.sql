CREATE TABLE IF NOT EXISTS `defect_category`
(
    `id`                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Surrogate key ID',
    `im_number`         INT UNSIGNED NOT NULL COMMENT 'Inspection Manual number identifying the defect category',
    `im_description`    VARCHAR(500) NOT NULL COMMENT 'Description of the Inspection Manual defect category',
    `for_vehicle_type`  JSON COMMENT 'JSON array of vehicle types this category applies to, e.g. ["psv","hgv","trl"]',
    `additional_info`   JSON COMMENT 'JSON object of vehicle-type-specific metadata controlling which location fields and notes apply, keyed by vehicle type (psv/hgv/trl)',
    PRIMARY KEY (`id`),
    UNIQUE INDEX `idx_im_number_uq` (`im_number` ASC) COMMENT 'Enforces uniqueness on the IM number and supports efficient lookups'
)
    ENGINE = InnoDB
    COMMENT = 'Defect categories from the Inspection Manual, representing the top-level grouping of defect items';

CREATE TABLE IF NOT EXISTS `defect_item`
(
    `id`                    BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Surrogate key ID',
    `defect_category_id`    BIGINT UNSIGNED NOT NULL COMMENT 'Defect category surrogate key ID. References `[defect_category].[id]`',
    `item_number`           INT UNSIGNED NOT NULL COMMENT 'Item number within the defect category',
    `item_description`      VARCHAR(500) NOT NULL COMMENT 'Description of the defect item',
    `for_vehicle_type`      JSON COMMENT 'JSON array of vehicle types this item applies to, e.g. ["psv","hgv","trl"]',
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_defect_item_category_id` FOREIGN KEY (`defect_category_id`) REFERENCES `defect_category` (`id`),
    INDEX `idx_defect_item_category_id` (`defect_category_id` ASC) COMMENT 'Supports efficient lookups of all items within a defect category'
)
    ENGINE = InnoDB
    COMMENT = 'Defect items within a category from the Inspection Manual, representing specific testable items';

CREATE TABLE IF NOT EXISTS `defect_deficiency`
(
    `id`                    BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Surrogate key ID',
    `defect_item_id`        BIGINT UNSIGNED NOT NULL COMMENT 'Defect item surrogate key ID. References `[defect_item].[id]`',
    `ref`                   VARCHAR(20) NOT NULL COMMENT 'Deficiency reference code',
    `deficiency_id`         VARCHAR(10) COMMENT 'Deficiency identifier within the item, may be null for single-deficiency items',
    `deficiency_sub_id`     VARCHAR(10) COMMENT 'Deficiency sub-identifier for further granularity',
    `deficiency_category`   VARCHAR(20) NOT NULL COMMENT 'Severity category of the deficiency, e.g. major, minor, dangerous',
    `deficiency_text`       VARCHAR(500) COMMENT 'Description of the deficiency',
    `std_for_prohibition`   BOOLEAN NOT NULL COMMENT 'Whether this deficiency meets the standard threshold for a prohibition',
    `for_vehicle_type`      JSON COMMENT 'JSON array of vehicle types this deficiency applies to, e.g. ["psv","hgv","trl"]',
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_defect_deficiency_item_id` FOREIGN KEY (`defect_item_id`) REFERENCES `defect_item` (`id`),
    INDEX `idx_defect_deficiency_item_id` (`defect_item_id` ASC) COMMENT 'Supports efficient lookups of all deficiencies within a defect item',
    INDEX `idx_defect_deficiency_ref` (`ref` ASC) COMMENT 'Supports efficient lookups by deficiency reference code'
)
    ENGINE = InnoDB
    COMMENT = 'Defect deficiencies within an item from the Inspection Manual, representing specific failure modes with severity classification';

CREATE TABLE IF NOT EXISTS `required_standard_section`
(
    `id`                    BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Surrogate key ID',
    `section_number`        VARCHAR(20) NOT NULL COMMENT 'Section number in the required standards taxonomy',
    `section_description`   VARCHAR(500) NOT NULL COMMENT 'Description of the section',
    `eu_vehicle_categories` JSON NOT NULL COMMENT 'JSON array of EU vehicle categories this section applies to, e.g. ["m1","n1"]',
    PRIMARY KEY (`id`),
    INDEX `idx_req_std_section_number` (`section_number` ASC) COMMENT 'Supports efficient lookups by section number'
)
    ENGINE = InnoDB
    COMMENT = 'Required standards taxonomy sections for IVA and MSVA inspections, grouped by EU vehicle category';

CREATE TABLE IF NOT EXISTS `required_standard`
(
    `id`                            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Surrogate key ID',
    `required_standard_section_id`  BIGINT UNSIGNED NOT NULL COMMENT 'Section surrogate key ID. References `[required_standard_section].[id]`',
    `rs_number`                     INT UNSIGNED NOT NULL COMMENT 'Required standard number within the section',
    `required_standard`             VARCHAR(500) NOT NULL COMMENT 'Description of the required standard',
    `ref_calculation`               VARCHAR(100) NOT NULL COMMENT 'Reference calculation for the required standard',
    `additional_info`               BOOLEAN NOT NULL COMMENT 'Whether additional information applies to this standard',
    `inspection_types`              JSON NOT NULL COMMENT 'JSON array of inspection types, e.g. ["basic","normal"]',
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_req_std_section_id` FOREIGN KEY (`required_standard_section_id`) REFERENCES `required_standard_section` (`id`),
    INDEX `idx_req_std_section_id` (`required_standard_section_id` ASC) COMMENT 'Supports efficient lookups of all standards within a section'
)
    ENGINE = InnoDB
    COMMENT = 'Individual required standards within a taxonomy section for IVA and MSVA inspections';
