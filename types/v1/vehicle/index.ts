import { z } from 'zod';
import { techRecordV1Schema } from '../../v3/tech-record';
import { testResultResponseSchema, testResultTestTypeResponseSchema } from '../test-result';

export const vehicleSchema = z.object({
    systemNumber: z.string(),
    vrm: z.string(),
    vin: z.string(),
    techRecord: techRecordV1Schema,
    testResultsHistory: z.array(testResultResponseSchema).optional(),
    countryOfRegistration: z.string().optional(),
    euVehicleCategory: z.string().optional(),
    odometerReading: z.string().optional(),
    odometerMetric: z.string().optional(),
    preparerId: z.string().optional(),
    preparerName: z.string().optional(),
    testTypes: z.array(testResultTestTypeResponseSchema).optional(),
    trailerId: z.string().optional(),
});

export type VehicleSchema = z.infer<typeof vehicleSchema>;
