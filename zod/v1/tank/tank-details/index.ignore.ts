// AUTO-GENERATED from json-definitions/v1/tank/tank-details/index.ignore.json. Do not edit by hand.

import { z } from "zod";

import { TC2DetailsSchema } from "./tc2-details/index.ignore";
import { TC3DetailsSchema } from "./tc3-details/index.ignore";

export const TankDetailsSchema = z.object({
  "tankManufacturer": z.string().optional(),
  "tc2Details": TC2DetailsSchema.optional(),
  "tc3Details": z.array(TC3DetailsSchema).optional(),
  "yearOfManufacture": z.string().optional(),
  "tankCode": z.string().optional(),
  "specialProvisions": z.string().optional(),
  "tankManufacturerSerialNo": z.string().optional(),
  "tankTypeAppNo": z.string().optional(),
}).strict();

export type TankDetailsSchema = z.infer<typeof TankDetailsSchema>;
