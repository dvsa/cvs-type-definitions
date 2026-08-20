// AUTO-GENERATED from json-definitions/v3/tech-record/enums/bodyTypeDescription.ignore.json. Do not edit by hand.

import { z } from "zod";

export const BodyTypeDescriptionSchema = z.enum(["artic","articulated","box","car transporter","concrete mixer","curtainsider","double decker","flat","livestock carrier","low loader","mini bus","other","other tanker","petrol/oil tanker","refrigerated","refuse","single decker","skeletal","skip loader","tipper","tractor"]);

export type BodyTypeDescription = z.infer<typeof BodyTypeDescriptionSchema>;
