import { z } from 'zod';

export const activityTypeEnum = z.enum(['visit', 'wait', 'unaccountable time']);
export type ActivityType = z.infer<typeof activityTypeEnum>;
