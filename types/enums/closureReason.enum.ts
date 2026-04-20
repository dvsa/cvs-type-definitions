import { z } from 'zod';

export const closureReasonEnum = z.enum(['Autoclose', 'Manual', 'Close all']);
export type ClosureReason = z.infer<typeof closureReasonEnum>;
