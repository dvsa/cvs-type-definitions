import { z } from 'zod';

export const fitmentCodeEnum = z.enum(['single', 'double']);
export type FitmentCode = z.infer<typeof fitmentCodeEnum>;
