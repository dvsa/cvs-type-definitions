import { z } from 'zod';

export const fuelTypeEnum = z.enum(['diesel', 'gas-cng', 'gas-lng', 'gas-lpg', 'petrol', 'fuel cell', 'full electric',]);
export type FuelType = z.infer<typeof fuelTypeEnum>;
