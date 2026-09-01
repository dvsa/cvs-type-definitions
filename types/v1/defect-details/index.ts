import { z } from 'zod';
import { mediaSchema } from '../media';
export { mediaSchema, type MediaSchema } from '../media';

// ─── Location schemas ────────────────────────────────────────────────────────

export const defectLocationSchema = z.object({
    vertical: z.string().nullable().optional(),
    horizontal: z.string().nullable().optional(),
    lateral: z.string().nullable().optional(),
    longitudinal: z.string().nullable().optional(),
    rowNumber: z.number().nullable().optional(),
    seatNumber: z.number().nullable().optional(),
    axleNumber: z.number().nullable().optional(),
});

export const defectLocationMetadataSchema = z.object({
    vertical: z.array(z.string()).nullable().optional(),
    horizontal: z.array(z.string()).nullable().optional(),
    lateral: z.array(z.string()).nullable().optional(),
    longitudinal: z.array(z.string()).nullable().optional(),
    rowNumber: z.array(z.number()).nullable().optional(),
    seatNumber: z.array(z.number()).nullable().optional(),
    axleNumber: z.array(z.number()).nullable().optional(),
});

export const defectAdditionalDetailsMetadataSchema = z.object({
    location: defectLocationMetadataSchema,
    notes: z.boolean(),
});

export const defectMetadataSchema = z.object({
    category: z.object({
        additionalInfo: defectAdditionalDetailsMetadataSchema.optional(),
    }),
});

// ─── Defect details ──────────────────────────────────────────────────────────

export const defectDetailsSchema = z.object({
    imNumber: z.number(),
    imDescription: z.string(),
    additionalInformation: z.object({
        location: defectLocationSchema,
        notes: z.string(),
    }),
    itemNumber: z.number(),
    itemDescription: z.string(),
    deficiencyRef: z.string(),
    deficiencyId: z.string().nullable(),
    deficiencySubId: z.string().nullable(),
    deficiencyCategory: z.string(),
    deficiencyText: z.string().nullable(),
    stdForProhibition: z.boolean().nullable(),
    prs: z.boolean().nullable(),
    prohibitionIssued: z.boolean().nullable(),
    metadata: defectMetadataSchema,
    media: z.array(mediaSchema).optional(),
});

export type DefectDetailsSchema = z.infer<typeof defectDetailsSchema>;
export type DefectLocationSchema = z.infer<typeof defectLocationSchema>;
export type DefectMetadataSchema = z.infer<typeof defectMetadataSchema>;
