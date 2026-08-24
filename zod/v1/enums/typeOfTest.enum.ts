// AUTO-GENERATED from json-definitions/v1/enums/typeOfTest.enum.json. Do not edit by hand.

import { z } from "zod";

export const Typeoftest = {
	"CONTINGENCY": "contingency",
	"DESK_BASED": "desk-based",
	"COMPLETION": "completion",
} as const;

export type Typeoftest = (typeof Typeoftest)[keyof typeof Typeoftest];

export const TypeoftestSchema = z.enum(Typeoftest);
