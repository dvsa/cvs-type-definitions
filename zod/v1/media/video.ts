// AUTO-GENERATED from json-definitions/v1/media/video.json. Do not edit by hand.

import { z } from "zod";

export const VideoSchema = z.object({
  "type": z.literal("video"),
  "path": z.string(),
}).strict();

export type VideoSchema = z.infer<typeof VideoSchema>;
