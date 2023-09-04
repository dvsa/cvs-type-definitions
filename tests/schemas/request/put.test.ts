import { readFileSync } from "fs";
import { Schema } from "../../../schema-validator";
import { schemas as validationSchemas } from "../../../schemas";

const readFile = (path: Schema) => {
  return JSON.parse(readFileSync(`json-schemas/${path}`).toString("utf-8"));
};

describe("required fields", () => {
  const requiredFields = ["vin", "techRecord_statusCode"];
  it.each(requiredFields)("should have %s required by the backend", (field) => {
    const schemas: Schema[] = validationSchemas.filter((schema) =>
      schema.includes("put")
    );
    const fields: Partial<Record<Schema, string[]>> = {};
    schemas.forEach((path) => {
      const file = readFile(path);
      fields[path] = Object.keys(file.properties)
        .filter((k) => file.required.includes(k))
        .sort();
    });

    schemas.forEach((s) => {
      expect(`${fields[s]?.indexOf(field)} ${s}`).not.toEqual(`-1 ${s}`);
      expect(fields[s]);
    });
  });
});

describe("fields added on get", () => {
  const fieldsAddedOnGet = [
    "techRecord_createdByName",
    "techRecord_createdAt",
    "techRecord_createdById",
    "createdTimestamp",
    "systemNumber",
  ];
  it.each(fieldsAddedOnGet)(
    "should not have %s added by the backend on put request",
    (field) => {
      const schemas: Schema[] = validationSchemas.filter((schema) =>
        schema.includes("put")
      );
      const fields: Partial<Record<Schema, string[]>> = {};
      schemas.forEach((path) => {
        const file = readFile(path);
        fields[path] = Object.keys(file.properties)
          .filter((k) => file.required.includes(k))
          .sort();
      });

      schemas.forEach((s) => {
        expect(`${fields[s]?.indexOf(field)} ${s}`).toEqual(`-1 ${s}`);
      });
    }
  );
});
