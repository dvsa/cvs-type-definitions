import { z } from 'zod';

export const dynamicsTestStationSchema = z.object({
    testStationId: z.string(),
    testStationPNumber: z.string(),
    testStationName: z.string(),
    testStationContactNumber: z.string(),
    testStationAccessNotes: z.string().nullable().optional(),
    testStationGeneralNotes: z.string().nullable().optional(),
    testStationTown: z.string(),
    testStationAddress: z.string(),
    testStationPostcode: z.string(),
    testStationLongitude: z.number().nullable().optional(),
    testStationLatitude: z.number().nullable().optional(),
    testStationType: z.string(),
    testStationEmails: z.array(z.string()),
    searchProperty: z.string().optional(),
    testStationCountry: z.string().nullable().optional(),
    testStationStatus: z.string(),
});

export type DynamicsTestStationSchema = z.infer<typeof dynamicsTestStationSchema>;
