import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { testCode, testType, testTypeRelationship } from './schema';

// ─── Table-level schemas ─────────────────────────────────────────────────────

export const selectTestTypeSchema = createSelectSchema(testType);
export const insertTestTypeSchema = createInsertSchema(testType);

export const selectTestCodeSchema = createSelectSchema(testCode);
export const insertTestCodeSchema = createInsertSchema(testCode);

export const selectTestTypeRelationshipSchema = createSelectSchema(testTypeRelationship);
export const insertTestTypeRelationshipSchema = createInsertSchema(testTypeRelationship);

// ─── Re-exports from types ──────────────────────────────────────────────────

export { getTestTypeSchema, type GETTestTypeSchema, type TestCodeSchema } from '../../types/test-type/get';
