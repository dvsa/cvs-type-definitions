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

export const HazardClassificationSchema = z.union([z.object({ "code": z.literal("1"), "description": z.literal("Explosive") }), z.object({ "code": z.literal("2"), "description": z.literal("Compressed Gases") }), z.object({ "code": z.literal("3"), "description": z.literal("Flammable liquids") }), z.object({ "code": z.literal("4.1"), "description": z.literal("Flammable solids") }), z.object({ "code": z.literal("4.2"), "description": z.literal("Spontaneously combustible") }), z.object({ "code": z.literal("4.3"), "description": z.literal("Dangerous when wet") }), z.object({ "code": z.literal("5.1"), "description": z.literal("Oxidising agents") }), z.object({ "code": z.literal("5.2"), "description": z.literal("Organic peroxides") }), z.object({ "code": z.literal("6.1"), "description": z.literal("Toxics") }), z.object({ "code": z.literal("6.2"), "description": z.literal("Infectious substances") }), z.object({ "code": z.literal("7"), "description": z.literal("Radioactive") }), z.object({ "code": z.literal("8"), "description": z.literal("Corrosives") }), z.object({ "code": z.literal("9"), "description": z.literal("Miscellaneous") })]);
