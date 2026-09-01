import { z } from 'zod';

export const approvalTypeEnum = z.enum(['NTA', 'ECTA', 'IVA', 'NSSTA', 'ECSSTA', 'GB WVTA', 'UKNI WVTA',
    'EU WVTA Pre 23', 'EU WVTA 23 on', 'QNIG', 'Prov.GB WVTA',
    'Small series NKSXX', 'Small series NKS', 'IVA - VCA', 'IVA - DVSA/NI',]);
export type ApprovalType = z.infer<typeof approvalTypeEnum>;
