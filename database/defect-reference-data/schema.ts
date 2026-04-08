import { relations } from 'drizzle-orm';
import {
    bigint,
    boolean,
    foreignKey,
    index,
    int,
    json,
    mysqlSchema,
    primaryKey,
    unique,
    varchar,
} from 'drizzle-orm/mysql-core';
import { formatSchemaName } from '../helper/format-schema-name';

/**
 * @generated-schema-doc
 * Schema: `defect_reference_data` | Table: `defect_category`
 *
 * | Column          | Type            | Nullable | Constraints       |
 * | --------------- | --------------- | -------- | ----------------- |
 * | id              | bigint unsigned | No       | PK, AUTO INC      |
 * | imNumber        | int unsigned    | No       | NOT NULL, UNIQUE  |
 * | imDescription   | varchar(500)    | No       | NOT NULL          |
 * | forVehicleType  | json            | Yes      |                   |
 * | additionalInfo  | json            | Yes      |                   |
 */
export const defectCategory = mysqlSchema(formatSchemaName('defect_reference_data')).table(
    'defect_category',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        imNumber: int('im_number', { unsigned: true }).notNull(),
        imDescription: varchar('im_description', { length: 500 }).notNull(),
        forVehicleType: json('for_vehicle_type').$type<string[]>(),
        additionalInfo: json('additional_info').$type<Record<string, { location: Record<string, string[] | number[] | null>; notes: boolean }>>(),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'defect_category_id' }),
        unique('idx_im_number_uq').on(table.imNumber),
    ],
);

/**
 * @generated-schema-doc
 * Schema: `defect_reference_data` | Table: `defect_item`
 *
 * | Column           | Type            | Nullable | Constraints  |
 * | ---------------- | --------------- | -------- | ------------ |
 * | id               | bigint unsigned | No       | PK, AUTO INC |
 * | defectCategoryId | bigint unsigned | No       | NOT NULL, FK |
 * | itemNumber       | int unsigned    | No       | NOT NULL     |
 * | itemDescription  | varchar(500)    | No       | NOT NULL     |
 * | forVehicleType   | json            | Yes      |              |
 */
export const defectItem = mysqlSchema(formatSchemaName('defect_reference_data')).table(
    'defect_item',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        defectCategoryId: bigint('defect_category_id', { mode: 'number', unsigned: true }).notNull(),
        itemNumber: int('item_number', { unsigned: true }).notNull(),
        itemDescription: varchar('item_description', { length: 500 }).notNull(),
        forVehicleType: json('for_vehicle_type').$type<string[]>(),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'defect_item_id' }),
        index('idx_defect_item_category_id').on(table.defectCategoryId),
        foreignKey({
            columns: [table.defectCategoryId],
            foreignColumns: [defectCategory.id],
            name: 'fk_defect_item_category_id',
        }),
    ],
);

/**
 * @generated-schema-doc
 * Schema: `defect_reference_data` | Table: `defect_deficiency`
 *
 * | Column             | Type            | Nullable | Constraints  |
 * | ------------------ | --------------- | -------- | ------------ |
 * | id                 | bigint unsigned | No       | PK, AUTO INC |
 * | defectItemId       | bigint unsigned | No       | NOT NULL, FK |
 * | ref                | varchar(20)     | No       | NOT NULL     |
 * | deficiencyId       | varchar(10)     | Yes      |              |
 * | deficiencySubId    | varchar(10)     | Yes      |              |
 * | deficiencyCategory | varchar(20)     | No       | NOT NULL     |
 * | deficiencyText     | varchar(500)    | Yes      |              |
 * | stdForProhibition  | boolean         | No       | NOT NULL     |
 * | forVehicleType     | json            | Yes      |              |
 */
export const defectDeficiency = mysqlSchema(formatSchemaName('defect_reference_data')).table(
    'defect_deficiency',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        defectItemId: bigint('defect_item_id', { mode: 'number', unsigned: true }).notNull(),
        ref: varchar({ length: 20 }).notNull(),
        deficiencyId: varchar('deficiency_id', { length: 10 }),
        deficiencySubId: varchar('deficiency_sub_id', { length: 10 }),
        deficiencyCategory: varchar('deficiency_category', { length: 20 }).notNull(),
        deficiencyText: varchar('deficiency_text', { length: 500 }),
        stdForProhibition: boolean('std_for_prohibition').notNull(),
        forVehicleType: json('for_vehicle_type').$type<string[]>(),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'defect_deficiency_id' }),
        index('idx_defect_deficiency_item_id').on(table.defectItemId),
        index('idx_defect_deficiency_ref').on(table.ref),
        foreignKey({
            columns: [table.defectItemId],
            foreignColumns: [defectItem.id],
            name: 'fk_defect_deficiency_item_id',
        }),
    ],
);

/**
 * @generated-schema-doc
 * Schema: `defect_reference_data` | Table: `required_standard_section`
 *
 * | Column              | Type            | Nullable | Constraints  |
 * | ------------------- | --------------- | -------- | ------------ |
 * | id                  | bigint unsigned | No       | PK, AUTO INC |
 * | sectionNumber       | varchar(20)     | No       | NOT NULL     |
 * | sectionDescription  | varchar(500)    | No       | NOT NULL     |
 * | euVehicleCategories | json            | No       | NOT NULL     |
 */
export const requiredStandardSection = mysqlSchema(formatSchemaName('defect_reference_data')).table(
    'required_standard_section',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        sectionNumber: varchar('section_number', { length: 20 }).notNull(),
        sectionDescription: varchar('section_description', { length: 500 }).notNull(),
        euVehicleCategories: json('eu_vehicle_categories').$type<string[]>().notNull(),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'required_standard_section_id' }),
        index('idx_req_std_section_number').on(table.sectionNumber),
    ],
);

/**
 * @generated-schema-doc
 * Schema: `defect_reference_data` | Table: `required_standard`
 *
 * | Column                     | Type            | Nullable | Constraints  |
 * | -------------------------- | --------------- | -------- | ------------ |
 * | id                         | bigint unsigned | No       | PK, AUTO INC |
 * | requiredStandardSectionId  | bigint unsigned | No       | NOT NULL, FK |
 * | rsNumber                   | int unsigned    | No       | NOT NULL     |
 * | requiredStandard           | varchar(500)    | No       | NOT NULL     |
 * | refCalculation             | varchar(100)    | No       | NOT NULL     |
 * | additionalInfo             | boolean         | No       | NOT NULL     |
 * | inspectionTypes            | json            | No       | NOT NULL     |
 */
export const requiredStandard = mysqlSchema(formatSchemaName('defect_reference_data')).table(
    'required_standard',
    {
        id: bigint({ mode: 'number', unsigned: true }).autoincrement().primaryKey(),
        requiredStandardSectionId: bigint('required_standard_section_id', { mode: 'number', unsigned: true }).notNull(),
        rsNumber: int('rs_number', { unsigned: true }).notNull(),
        requiredStandard: varchar('required_standard', { length: 500 }).notNull(),
        refCalculation: varchar('ref_calculation', { length: 100 }).notNull(),
        additionalInfo: boolean('additional_info').notNull(),
        inspectionTypes: json('inspection_types').$type<string[]>().notNull(),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'required_standard_id' }),
        index('idx_req_std_section_id').on(table.requiredStandardSectionId),
        foreignKey({
            columns: [table.requiredStandardSectionId],
            foreignColumns: [requiredStandardSection.id],
            name: 'fk_req_std_section_id',
        }),
    ],
);

// ─── Relations ───────────────────────────────────────────────────────────────

export const defectCategoryRelations = relations(defectCategory, ({ many }) => ({
    items: many(defectItem),
}));

export const defectItemRelations = relations(defectItem, ({ one, many }) => ({
    category: one(defectCategory, {
        fields: [defectItem.defectCategoryId],
        references: [defectCategory.id],
    }),
    deficiencies: many(defectDeficiency),
}));

export const defectDeficiencyRelations = relations(defectDeficiency, ({ one }) => ({
    item: one(defectItem, {
        fields: [defectDeficiency.defectItemId],
        references: [defectItem.id],
    }),
}));

export const requiredStandardSectionRelations = relations(requiredStandardSection, ({ many }) => ({
    standards: many(requiredStandard),
}));

export const requiredStandardRelations = relations(requiredStandard, ({ one }) => ({
    section: one(requiredStandardSection, {
        fields: [requiredStandard.requiredStandardSectionId],
        references: [requiredStandardSection.id],
    }),
}));