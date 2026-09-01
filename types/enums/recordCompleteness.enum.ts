import { z } from 'zod';

export const recordCompletenessEnum = z.enum(['complete', 'testable', 'skeleton']);
export type RecordCompleteness = z.infer<typeof recordCompletenessEnum>;
