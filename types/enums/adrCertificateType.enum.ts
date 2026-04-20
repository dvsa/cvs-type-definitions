import { z } from 'zod';

export const adrCertificateTypeEnum = z.enum(['PASS', 'REPLACEMENT']);
export type AdrCertificateType = z.infer<typeof adrCertificateTypeEnum>;
