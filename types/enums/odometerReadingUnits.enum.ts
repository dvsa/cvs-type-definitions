import { z } from 'zod';

export const odometerReadingUnitsEnum = z.enum(['kilometres', 'miles']);
export type OdometerReadingUnits = z.infer<typeof odometerReadingUnitsEnum>;
