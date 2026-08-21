// AUTO-GENERATED from json-definitions/enums/hazardClassification.enum.json. Do not edit by hand.

import { z } from "zod";

export const HazardClassification = {
	"_1": {"code":"1","description":"Explosive"},
	"_2": {"code":"2","description":"Compressed Gases"},
	"_3": {"code":"3","description":"Flammable liquids"},
	"_4.1": {"code":"4.1","description":"Flammable solids"},
	"_4.2": {"code":"4.2","description":"Spontaneously combustible"},
	"_4.3": {"code":"4.3","description":"Dangerous when wet"},
	"_5.1": {"code":"5.1","description":"Oxidising agents"},
	"_5.2": {"code":"5.2","description":"Organic peroxides"},
	"_6.1": {"code":"6.1","description":"Toxics"},
	"_6.2": {"code":"6.2","description":"Infectious substances"},
	"_7": {"code":"7","description":"Radioactive"},
	"_8": {"code":"8","description":"Corrosives"},
	"_9": {"code":"9","description":"Miscellaneous"},
} as const;

export type HazardClassification = (typeof HazardClassification)[keyof typeof HazardClassification];

export const HazardClassificationSchema = z.custom<HazardClassification>((value) => value != null && typeof value === 'object' && Object.values(HazardClassification).some((member) => Object.keys(member).length === Object.keys(value).length && Object.entries(member).every(([key, val]) => (value as Record<string, unknown>)[key] === val)));
