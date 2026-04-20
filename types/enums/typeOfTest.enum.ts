import { z } from 'zod';

export const typeOfTestEnum = z.enum(['contingency', 'desk-based', 'completion']);
export type TypeOfTest = z.infer<typeof typeOfTestEnum>;
