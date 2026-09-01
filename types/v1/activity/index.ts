import { z } from 'zod';
import {
    activityTypeEnum,
    closureReasonEnum,
    testStationTypeEnum,
    waitReasonEnum,
} from '../../../database/enums';

export const activitySchema = z.object({
    parentId: z.string().optional(),
    id: z.string().optional(),
    activityType: activityTypeEnum,
    testStationName: z.string(),
    testStationPNumber: z.string(),
    testStationEmail: z.string(),
    testStationType: testStationTypeEnum,
    testerName: z.string(),
    testerStaffId: z.string(),
    testerEmail: z.string().optional(),
    startTime: z.string(),
    endTime: z.string().nullable().optional(),
    waitReason: z.array(waitReasonEnum).optional(),
    notes: z.string().nullable().optional(),
    activityDay: z.string().optional(),
    closureReason: closureReasonEnum.optional(),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
