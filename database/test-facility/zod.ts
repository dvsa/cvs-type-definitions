import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { activity, testStation } from './schema';

// ─── Table-level schemas ─────────────────────────────────────────────────────

export const selectActivitySchema = createSelectSchema(activity);
export const insertActivitySchema = createInsertSchema(activity);

export const selectTestStationSchema = createSelectSchema(testStation);
export const insertTestStationSchema = createInsertSchema(testStation);

// ─── Re-exports from types ──────────────────────────────────────────────────

export { activitySchema, type ActivitySchema } from '../../types/v1/activity';
export { testStationSchema, emailPartialTestStationSchema, type TestStationSchema, type EmailPartialTestStation } from '../../types/v1/test-station';
