import { z } from 'zod';

export const recallsSchema = z.object({
    hasRecall: z.boolean(),
    manufacturer: z.string().nullable(),
});

export type RecallsSchema = z.infer<typeof recallsSchema>;
