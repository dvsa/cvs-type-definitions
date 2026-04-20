import { z } from 'zod';

export const imageSchema = z.object({ type: z.literal('image'), path: z.string() });
export const videoSchema = z.object({ type: z.literal('video'), path: z.string() });
export const failReasonSchema = z.object({ type: z.literal('failReason'), path: z.string(), reason: z.string() });

export const mediaSchema = z.discriminatedUnion('type', [imageSchema, videoSchema, failReasonSchema]);

export type MediaSchema = z.infer<typeof mediaSchema>;
export type ImageSchema = z.infer<typeof imageSchema>;
export type VideoSchema = z.infer<typeof videoSchema>;
export type FailReasonSchema = z.infer<typeof failReasonSchema>;
