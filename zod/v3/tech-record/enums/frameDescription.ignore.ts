// AUTO-GENERATED from json-definitions/v3/tech-record/enums/frameDescription.ignore.json. Do not edit by hand.

import { z } from "zod";

export const FrameDescriptionSchema = z.enum(["Channel section","Space frame","I section","Tubular","Frame section","Other","integral","Box section","U section"]);

export type FrameDescription = z.infer<typeof FrameDescriptionSchema>;
