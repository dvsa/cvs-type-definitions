// AUTO-GENERATED from json-definitions/v3/tech-record/enums/statusCode.ignore.json. Do not edit by hand.

import { z } from "zod";

export const StatusCodeSchema = z.enum(["provisional","current","archived"]);

export type StatusCode = z.infer<typeof StatusCodeSchema>;
