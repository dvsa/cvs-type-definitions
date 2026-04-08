CREATE TABLE IF NOT EXISTS `test_type` (
                                           `id`                                VARCHAR(10) NOT NULL,
                                           `parent_id`                         VARCHAR(10) NULL,
                                           `sort_id`                           VARCHAR(10) NULL,
                                           `name`                              VARCHAR(200) NOT NULL,
                                           `test_type_name`                    VARCHAR(200) NULL,
                                           `type_of_test`                      VARCHAR(50) NULL,
                                           `test_type_classification`          VARCHAR(50) NULL,
                                           `suggested_test_type_display_name`  VARCHAR(200) NULL,
                                           `suggested_test_type_display_order` VARCHAR(10) NULL,
                                           `for_vehicle_type`                  JSON NULL,
                                           `for_vehicle_size`                  JSON NULL,
                                           `for_vehicle_configuration`         JSON NULL,
                                           `for_vehicle_axles`                 JSON NULL,
                                           `for_eu_vehicle_category`           JSON NULL,
                                           `for_vehicle_class`                 JSON NULL,
                                           `for_vehicle_subclass`              JSON NULL,
                                           `for_vehicle_wheels`                JSON NULL,
                                           `for_provisional_status`            BOOLEAN NULL,
                                           `for_provisional_status_only`       BOOLEAN NULL,
                                           PRIMARY KEY (`id`),
                                           INDEX `idx_test_type_parent_id` (`parent_id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `test_code` (
                                           `id`                        INT UNSIGNED NOT NULL AUTO_INCREMENT,
                                           `test_type_id`              VARCHAR(10) NOT NULL,
                                           `default_test_code`         VARCHAR(10) NOT NULL,
                                           `linked_test_code`          VARCHAR(10) NULL,
                                           `for_vehicle_type`          VARCHAR(20) NULL,
                                           `for_vehicle_size`          VARCHAR(20) NULL,
                                           `for_vehicle_configuration` JSON NULL,
                                           `for_vehicle_axles`         JSON NULL,
                                           `for_eu_vehicle_category`   JSON NULL,
                                           `for_vehicle_class`         VARCHAR(10) NULL,
                                           `for_vehicle_subclass`      JSON NULL,
                                           `for_vehicle_wheels`        JSON NULL,
                                           `for_provisional_status`    BOOLEAN NULL,
                                           `for_provisional_status_only` BOOLEAN NULL,
                                           PRIMARY KEY (`id`),
                                           INDEX `idx_test_code_test_type_id` (`test_type_id`),
                                           CONSTRAINT `fk_test_code_test_type_id`
                                               FOREIGN KEY (`test_type_id`) REFERENCES `test_type`(`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `test_type_relationship` (
                                                        `id`                    INT UNSIGNED NOT NULL AUTO_INCREMENT,
                                                        `test_type_id`          VARCHAR(10) NOT NULL,
                                                        `related_test_type_id`  VARCHAR(10) NOT NULL,
                                                        `relationship_type`     ENUM('linked', 'suggested') NOT NULL,
                                                        PRIMARY KEY (`id`),
                                                        INDEX `idx_ttr_test_type_id` (`test_type_id`),
                                                        INDEX `idx_ttr_related_test_type_id` (`related_test_type_id`),
                                                        CONSTRAINT `fk_ttr_test_type_id`
                                                            FOREIGN KEY (`test_type_id`) REFERENCES `test_type`(`id`),
                                                        CONSTRAINT `fk_ttr_related_test_type_id`
                                                            FOREIGN KEY (`related_test_type_id`) REFERENCES `test_type`(`id`)
) ENGINE = InnoDB;
