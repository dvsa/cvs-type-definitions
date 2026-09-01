import { z } from 'zod';

export const retarderBrakeEnum = z.enum(['electric', 'exhaust', 'friction', 'hydraulic', 'other', 'none']);
export type RetarderBrake = z.infer<typeof retarderBrakeEnum>;
