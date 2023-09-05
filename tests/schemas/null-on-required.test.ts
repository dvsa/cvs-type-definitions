import { readFileSync } from "fs";
import { Schema } from "../../schema-validator";
import { schemas } from "../../schemas";

const readFile = (path: Schema) => {
  return JSON.parse(readFileSync(`json-schemas/${path}`).toString("utf-8"));
};

const containsNull = (field: any) => {
  if (field.type) {
    return Array.isArray(field.type)
      ? field.type.includes("null")
      : field.type === "null";
  } else if (field.anyOf) {
    return !!field.anyOf.find((o: any) =>
      Array.isArray(o.type) ? o.type.includes("null") : o.type === "null"
    );
  }
};

describe("there should not be any required fields which accept null on put requests", () => {
  const whitelist = ["techRecord_dda_certificateIssued"];
  it.each(schemas.filter((s) => s.includes("put")))(
    "%s should not accept null",
    (schema) => {
      const file = readFile(schema);
      expect.assertions(file.required.length - whitelist.length);
      file.required.forEach((field: any) => {
        if (whitelist.includes(field)) {
          return;
        }
        const fieldProps = file.properties[field];
        const hasNull = !!containsNull(fieldProps);
        expect(`${hasNull}${schema}${field}`).toEqual(
          `${false}${schema}${field}`
        );
        expect(hasNull).toBe(false);
      });
    }
  );
});
