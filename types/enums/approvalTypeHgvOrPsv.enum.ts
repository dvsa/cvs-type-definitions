import { z } from 'zod';

export const approvalTypeHgvOrPsvEnum = z.enum(['NTA', 'ECTA', 'IVA', 'NSSTA', 'ECSSTA', 'GB WVTA', 'Prov.GB WVTA',
    'Small series NKSXX', 'Small series NKS', 'IVA - VCA', 'IVA - DVSA/NI',]);
export type ApprovalTypeHgvOrPsv = z.infer<typeof approvalTypeHgvOrPsvEnum>;
