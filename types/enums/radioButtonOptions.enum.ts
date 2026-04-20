import { z } from 'zod';

export const radioButtonOptionsEnum = z.enum(['yes', 'no', 'n/a']);
export type RadioButtonOption = z.infer<typeof radioButtonOptionsEnum>;
