// AUTO-GENERATED from json-definitions/v1/media/image.json. Do not edit by hand.

import { z } from "zod";

export const ImageSchema = z.object({
  "type": z.literal("image"),
  "path": z.string(),
}).strict();

export type ImageSchema = z.infer<typeof ImageSchema>;
