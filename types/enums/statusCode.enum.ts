import { z } from 'zod';

export const statusCodeEnum = z.enum(['provisional', 'current', 'archived']);
export type StatusCode = z.infer<typeof statusCodeEnum>;
