// AUTO-GENERATED from json-definitions/v3/tech-record/enums/manufactureMonth.ignore.json. Do not edit by hand.

import { z } from "zod";

export const MonthsSchema = z.enum(["January","February","March","April","May","June","July","August","September","October","November","December"]);

export type Months = z.infer<typeof MonthsSchema>;
