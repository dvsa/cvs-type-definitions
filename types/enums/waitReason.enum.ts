import { z } from 'zod';

export const waitReasonEnum = z.enum(['Waiting for vehicle', 'Break', 'Admin', 'Site issue', 'Other']);
export type WaitReason = z.infer<typeof waitReasonEnum>;
