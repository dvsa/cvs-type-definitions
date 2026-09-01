import { z } from 'zod';

export const plateReasonForIssueEnum = z.enum(['Free replacement', 'Replacement', 'Destroyed', 'Provisional', 'Original', 'Manual',]);
export type PlateReasonForIssue = z.infer<typeof plateReasonForIssueEnum>;
