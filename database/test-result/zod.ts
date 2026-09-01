import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import {
    testResult,
    testResultCustomDefect,
    testResultDefect,
    testResultRequiredStandard,
    testResultTestType,
} from './schema';

// ─── Table-level schemas ─────────────────────────────────────────────────────

export const selectTestResultSchema = createSelectSchema(testResult);
export const insertTestResultSchema = createInsertSchema(testResult);

export const selectTestResultTestTypeSchema = createSelectSchema(testResultTestType);
export const insertTestResultTestTypeSchema = createInsertSchema(testResultTestType);

export const selectTestResultDefectSchema = createSelectSchema(testResultDefect);
export const insertTestResultDefectSchema = createInsertSchema(testResultDefect);

export const selectTestResultCustomDefectSchema = createSelectSchema(testResultCustomDefect);
export const insertTestResultCustomDefectSchema = createInsertSchema(testResultCustomDefect);

export const selectTestResultRequiredStandardSchema = createSelectSchema(testResultRequiredStandard);
export const insertTestResultRequiredStandardSchema = createInsertSchema(testResultRequiredStandard);

// ─── Re-exports from types for convenience ──────────────────────────────────

export { testResultResponseSchema, type TestResultSchema, testResultTestTypeResponseSchema, type TestResultTestTypeSchema } from '../../types/v1/test-result';
