// AUTO-GENERATED from json-definitions/v1/media/index.json. Do not edit by hand.

import { z } from "zod";

import { ImageSchema } from "./image";
import { VideoSchema } from "./video";
import { FailReasonSchema } from "./failReason";

export const MediaSchema = z.union([ImageSchema, VideoSchema, FailReasonSchema]);

export type MediaSchema = z.infer<typeof MediaSchema>;
