import { z } from 'zod';

export const testStatusEnum = z.enum(['submitted', 'cancelled']);
export type TestStatus = z.infer<typeof testStatusEnum>;
