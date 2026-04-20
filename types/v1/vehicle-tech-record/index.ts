import { z } from 'zod';
import { techRecordV1Schema } from '../../v3/tech-record';

export const vehicleTechRecordSchema = z.object({
    systemNumber: z.string(),
    vrms: z.array(z.object({
        vrm: z.string(),
        isPrimary: z.boolean().optional(),
    })),
    vin: z.string(),
    techRecord: z.array(techRecordV1Schema),
    trailerId: z.string().optional(),
});

export type VehicleTechRecordSchema = z.infer<typeof vehicleTechRecordSchema>;
