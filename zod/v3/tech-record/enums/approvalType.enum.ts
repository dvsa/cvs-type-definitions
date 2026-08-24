// AUTO-GENERATED from json-definitions/v3/tech-record/enums/approvalType.enum.json. Do not edit by hand.

import { z } from "zod";

export const ApprovalType = {
	"NTA": "NTA",
	"ECTA": "ECTA",
	"IVA": "IVA",
	"NSSTA": "NSSTA",
	"ECSSTA": "ECSSTA",
	"GB_WVTA": "GB WVTA",
	"UKNI_WVTA": "UKNI WVTA",
	"EU_WVTA_PRE_23": "EU WVTA Pre 23",
	"EU_WVTA_23_ON": "EU WVTA 23 on",
	"QNIG": "QNIG",
	"PROV_GB_WVTA": "Prov.GB WVTA",
	"SMALL_SERIES_NKSXX": "Small series NKSXX",
	"SMALL_SERIES_NKS": "Small series NKS",
	"IVA_VCA": "IVA - VCA",
	"IVA_DVSA_NI": "IVA - DVSA/NI",
} as const;

export type ApprovalType = (typeof ApprovalType)[keyof typeof ApprovalType];

export const ApprovalTypeSchema = z.enum(ApprovalType);
