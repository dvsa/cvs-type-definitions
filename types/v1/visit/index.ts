import { z } from 'zod';
import { testSchema } from '../test';

export const visitSchema = z.object({
    startTime: z.string(),
    endTime: z.string(),
    testStationName: z.string(),
    testStationPNumber: z.string(),
    testStationEmail: z.string(),
    testStationType: z.string(),
    testerName: z.string(),
    testerId: z.string(),
    testerEmail: z.string(),
    tests: z.array(testSchema),
    id: z.string().optional(),
});

export type VisitSchema = z.infer<typeof visitSchema>;
