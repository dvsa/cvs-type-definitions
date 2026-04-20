import { z } from 'zod';

export const testTypeClassificationEnum = z.enum(['Annual NO CERTIFICATE', 'Annual With Certificate', 'NON ANNUAL',
    'IVA With Certificate', 'MSVA With Certificate',]);
export type TestTypeClassification = z.infer<typeof testTypeClassificationEnum>;
