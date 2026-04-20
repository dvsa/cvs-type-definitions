import { z } from 'zod';

export const tc3TypeEnum = z.enum(['intermediate', 'periodic', 'exceptional']);
export type TC3Type = z.infer<typeof tc3TypeEnum>;
