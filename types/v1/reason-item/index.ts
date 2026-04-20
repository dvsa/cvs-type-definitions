import { z } from 'zod';

export const reasonItemSchema = z.object({
    text: z.string(),
    isChecked: z.boolean(),
});

export type ReasonItemSchema = z.infer<typeof reasonItemSchema>;
