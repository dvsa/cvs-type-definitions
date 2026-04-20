import { z } from 'zod';

export const testSourceEnum = z.enum(['vtm', 'vta']);
export type TestSource = z.infer<typeof testSourceEnum>;
