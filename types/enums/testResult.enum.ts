import { z } from 'zod';

export const testResultEnum = z.enum(['pass', 'prs', 'fail', 'abandoned']);
export type TestResult = z.infer<typeof testResultEnum>;
