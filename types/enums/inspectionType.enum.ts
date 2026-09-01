import { z } from 'zod';

export const inspectionTypeEnum = z.enum(['basic', 'normal']);
export type InspectionType = z.infer<typeof inspectionTypeEnum>;
