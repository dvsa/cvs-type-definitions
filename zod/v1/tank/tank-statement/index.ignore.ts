// AUTO-GENERATED from json-definitions/v1/tank/tank-statement/index.ignore.json. Do not edit by hand.

import { z } from "zod";

export const TankStatementSchema = z.object({
  "substancesPermitted": z.string().optional(),
  "statement": z.string().optional(),
  "productList": z.string().optional(),
  "productListRefNo": z.string().optional(),
  "productListUnNo": z.array(z.string()).optional(),
}).strict();

export type TankStatementSchema = z.infer<typeof TankStatementSchema>;
