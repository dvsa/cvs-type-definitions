// AUTO-GENERATED from json-definitions/v3/tech-record/enums/adrCertificateTypes.enum.json. Do not edit by hand.

import { z } from "zod";

export const ADRCertificateTypes = {
	"PASS": "PASS",
	"REPLACEMENT": "REPLACEMENT",
} as const;

export type ADRCertificateTypes = (typeof ADRCertificateTypes)[keyof typeof ADRCertificateTypes];

export const ADRCertificateTypesSchema = z.enum(ADRCertificateTypes);
