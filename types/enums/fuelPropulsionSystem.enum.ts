import { z } from 'zod';

export const fuelPropulsionSystemEnum = z.enum(['DieselPetrol', 'Diesel', 'Petrol', 'Hybrid', 'Electric',
    'CNG', 'Fuel cell', 'LNG', 'Ethanol', 'Other',]);
export type FuelPropulsionSystem = z.infer<typeof fuelPropulsionSystemEnum>;
