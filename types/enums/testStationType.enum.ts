import { z } from 'zod';

export const testStationTypeEnum = z.enum(['atf', 'gvts', 'hq', 'potf', 'vef']);
export type TestStationType = z.infer<typeof testStationTypeEnum>;
