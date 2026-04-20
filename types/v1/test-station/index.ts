import { z } from 'zod';

export const testStationSchema = z.object({
    testStationId: z.string(),
    testStationPNumber: z.string(),
    testStationName: z.string(),
    testStationContactNumber: z.string(),
    testStationAccessNotes: z.string(),
    testStationGeneralNotes: z.string(),
    testStationTown: z.string(),
    testStationAddress: z.string(),
    testStationPostcode: z.string(),
    testStationLongitude: z.number(),
    testStationLatitude: z.number(),
    testStationType: z.string(),
    testStationEmails: z.array(z.string()),
    testStationStatus: z.string(),
    testStationCountry: z.string().optional(),
});

export type TestStationSchema = z.infer<typeof testStationSchema>;

export const emailPartialTestStationSchema = z.object({
    testStationEmails: z.array(z.string()),
    testStationId: z.string(),
    testStationPNumber: z.string(),
});

export type EmailPartialTestStation = z.infer<typeof emailPartialTestStationSchema>;
