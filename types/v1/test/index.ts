import { z } from 'zod';
import { testStatusEnum } from '../../../database/enums';
import { vehicleSchema } from '../vehicle';

export const testSchema = z.object({
    testResultId: z.string().optional(),
    startTime: z.string(),
    endTime: z.string(),
    status: testStatusEnum.nullable(),
    reasonForCancellation: z.string().optional(),
    vehicles: z.array(vehicleSchema),
});

export type TestSchema = z.infer<typeof testSchema>;
