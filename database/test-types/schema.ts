import { relations } from 'drizzle-orm';
import {
    boolean,
    foreignKey,
    index,
    int,
    json,
    mysqlSchema,
    primaryKey,
    varchar,
} from 'drizzle-orm/mysql-core';
import { formatSchemaName } from '../helper/format-schema-name';

/**
 * @generated-schema-doc
 * Schema: `test_types` | Table: `test_type`
 *
 * Reference catalog of test type definitions (IM taxonomy). Not to be confused with
 * `testResultTestType` in `database/test-result/schema.ts`, which records the execution
 * of one of these test types during a specific test visit.
 *
 * | Column                         | Type        | Nullable | Constraints |
 * | ------------------------------ | ----------- | -------- | ----------- |
 * | id                             | varchar(10) | No       | PK          |
 * | parentId                       | varchar(10) | Yes      |             |
 * | sortId                         | varchar(10) | Yes      |             |
 * | name                           | varchar(200)| No       | NOT NULL    |
 * | testTypeName                   | varchar(200)| Yes      |             |
 * | typeOfTest                     | varchar(50) | Yes      |             |
 * | testTypeClassification         | varchar(50) | Yes      |             |
 * | suggestedTestTypeDisplayName   | varchar(200)| Yes      |             |
 * | suggestedTestTypeDisplayOrder  | varchar(10) | Yes      |             |
 * | forVehicleType                 | json        | Yes      |             |
 * | forVehicleSize                 | json        | Yes      |             |
 * | forVehicleConfiguration        | json        | Yes      |             |
 * | forVehicleAxles                | json        | Yes      |             |
 * | forEuVehicleCategory           | json        | Yes      |             |
 * | forVehicleClass                | json        | Yes      |             |
 * | forVehicleSubclass             | json        | Yes      |             |
 * | forVehicleWheels               | json        | Yes      |             |
 * | forProvisionalStatus           | boolean     | Yes      |             |
 * | forProvisionalStatusOnly       | boolean     | Yes      |             |
 */
export const testType = mysqlSchema(formatSchemaName('test_types')).table(
    'test_type',
    {
        id: varchar({ length: 10 }).primaryKey(),
        parentId: varchar('parent_id', { length: 10 }),
        sortId: varchar('sort_id', { length: 10 }),
        name: varchar({ length: 200 }).notNull(),
        testTypeName: varchar('test_type_name', { length: 200 }),
        typeOfTest: varchar('type_of_test', { length: 50 }),
        testTypeClassification: varchar('test_type_classification', { length: 50 }),
        suggestedTestTypeDisplayName: varchar('suggested_test_type_display_name', { length: 200 }),
        suggestedTestTypeDisplayOrder: varchar('suggested_test_type_display_order', { length: 10 }),
        forVehicleType: json('for_vehicle_type').$type<string[]>(),
        forVehicleSize: json('for_vehicle_size').$type<string[] | null>(),
        forVehicleConfiguration: json('for_vehicle_configuration').$type<string[] | null>(),
        forVehicleAxles: json('for_vehicle_axles').$type<number[] | null>(),
        forEuVehicleCategory: json('for_eu_vehicle_category').$type<string[] | null>(),
        forVehicleClass: json('for_vehicle_class').$type<string[] | null>(),
        forVehicleSubclass: json('for_vehicle_subclass').$type<string[] | null>(),
        forVehicleWheels: json('for_vehicle_wheels').$type<number[] | null>(),
        forProvisionalStatus: boolean('for_provisional_status'),
        forProvisionalStatusOnly: boolean('for_provisional_status_only'),
    },
    (table) => [
        index('idx_test_type_parent_id').on(table.parentId),
    ],
);

/**
 * @generated-schema-doc
 * Schema: `test_types` | Table: `test_code`
 *
 * | Column                   | Type            | Nullable | Constraints  |
 * | ------------------------ | --------------- | -------- | ------------ |
 * | id                       | int unsigned    | No       | PK, AUTO INC |
 * | testTypeId               | varchar(10)     | No       | NOT NULL, FK |
 * | defaultTestCode          | varchar(10)     | No       | NOT NULL     |
 * | linkedTestCode           | varchar(10)     | Yes      |              |
 * | forVehicleType           | varchar(20)     | Yes      |              |
 * | forVehicleSize           | varchar(20)     | Yes      |              |
 * | forVehicleConfiguration  | json            | Yes      |              |
 * | forVehicleAxles          | json            | Yes      |              |
 * | forEuVehicleCategory     | json            | Yes      |              |
 * | forVehicleClass          | varchar(10)     | Yes      |              |
 * | forVehicleSubclass       | json            | Yes      |              |
 * | forVehicleWheels         | json            | Yes      |              |
 * | forProvisionalStatus     | boolean         | Yes      |              |
 * | forProvisionalStatusOnly | boolean         | Yes      |              |
 */
export const testCode = mysqlSchema(formatSchemaName('test_types')).table(
    'test_code',
    {
        id: int({ unsigned: true }).autoincrement().primaryKey(),
        testTypeId: varchar('test_type_id', { length: 10 }).notNull(),
        defaultTestCode: varchar('default_test_code', { length: 10 }).notNull(),
        linkedTestCode: varchar('linked_test_code', { length: 10 }),
        forVehicleType: varchar('for_vehicle_type', { length: 20 }),
        forVehicleSize: varchar('for_vehicle_size', { length: 20 }),
        forVehicleConfiguration: json('for_vehicle_configuration').$type<string[] | null>(),
        forVehicleAxles: json('for_vehicle_axles').$type<number[] | null>(),
        forEuVehicleCategory: json('for_eu_vehicle_category').$type<string[] | null>(),
        forVehicleClass: varchar('for_vehicle_class', { length: 10 }),
        forVehicleSubclass: json('for_vehicle_subclass').$type<string[] | null>(),
        forVehicleWheels: json('for_vehicle_wheels').$type<number[] | null>(),
        forProvisionalStatus: boolean('for_provisional_status'),
        forProvisionalStatusOnly: boolean('for_provisional_status_only'),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'test_code_id' }),
        index('idx_test_code_test_type_id').on(table.testTypeId),
        foreignKey({
            columns: [table.testTypeId],
            foreignColumns: [testType.id],
            name: 'fk_test_code_test_type_id',
        }),
    ],
);

/**
 * @generated-schema-doc
 * Schema: `test_types` | Table: `test_type_relationship`
 *
 * | Column            | Type            | Nullable | Constraints  |
 * | ----------------- | --------------- | -------- | ------------ |
 * | id                | int unsigned    | No       | PK, AUTO INC |
 * | testTypeId        | varchar(10)     | No       | NOT NULL, FK |
 * | relatedTestTypeId | varchar(10)     | No       | NOT NULL, FK |
 * | relationshipType  | varchar(10)     | No       | NOT NULL     |
 */
export const testTypeRelationship = mysqlSchema(formatSchemaName('test_types')).table(
    'test_type_relationship',
    {
        id: int({ unsigned: true }).autoincrement().primaryKey(),
        testTypeId: varchar('test_type_id', { length: 10 }).notNull(),
        relatedTestTypeId: varchar('related_test_type_id', { length: 10 }).notNull(),
        relationshipType: varchar('relationship_type', { length: 10 }).notNull(),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'test_type_relationship_id' }),
        index('idx_ttr_test_type_id').on(table.testTypeId),
        index('idx_ttr_related_test_type_id').on(table.relatedTestTypeId),
        foreignKey({
            columns: [table.testTypeId],
            foreignColumns: [testType.id],
            name: 'fk_ttr_test_type_id',
        }),
        foreignKey({
            columns: [table.relatedTestTypeId],
            foreignColumns: [testType.id],
            name: 'fk_ttr_related_test_type_id',
        }),
    ],
);

// ─── Relations ───────────────────────────────────────────────────────────────

export const testTypeRelations = relations(testType, ({ one, many }) => ({
    parent: one(testType, {
        fields: [testType.parentId],
        references: [testType.id],
        relationName: 'parentChild',
    }),
    children: many(testType, { relationName: 'parentChild' }),
    testCodes: many(testCode),
    relationships: many(testTypeRelationship, { relationName: 'source' }),
    relatedBy: many(testTypeRelationship, { relationName: 'target' }),
}));

export const testCodeRelations = relations(testCode, ({ one }) => ({
    testType: one(testType, {
        fields: [testCode.testTypeId],
        references: [testType.id],
    }),
}));

export const testTypeRelationshipRelations = relations(testTypeRelationship, ({ one }) => ({
    testType: one(testType, {
        fields: [testTypeRelationship.testTypeId],
        references: [testType.id],
        relationName: 'source',
    }),
    relatedTestType: one(testType, {
        fields: [testTypeRelationship.relatedTestTypeId],
        references: [testType.id],
        relationName: 'target',
    }),
}));