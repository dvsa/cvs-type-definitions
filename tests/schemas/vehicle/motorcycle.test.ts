import { readFileSync } from "fs";
import { Schema } from "../../../schema-validator";

const readFile = (path: Schema) => {
  return JSON.parse(readFileSync(`json-schemas/${path}`).toString("utf-8"));
};

describe("should have the same length of keys regardless of status", () => {
  it("put motorcycle", () => {
    const schemas: Schema[] = [
      "v3/tech-record/put/motorcycle/complete/index.json",
      "v3/tech-record/put/motorcycle/skeleton/index.json",
    ];
    const fields: Partial<Record<Schema, string[]>> = {};
    schemas.forEach((path) => {
      fields[path] = Object.keys(readFile(path).properties).sort();
    });

    expect(fields[schemas[0]]).toEqual(fields[schemas[1]]);
  });

  it("get motorcycle", () => {
    const schemas: Schema[] = [
      "v3/tech-record/get/motorcycle/complete/index.json",
      "v3/tech-record/get/motorcycle/skeleton/index.json",
    ];
    const fields: Partial<Record<Schema, string[]>> = {};
    schemas.forEach((path) => {
      fields[path] = Object.keys(readFile(path).properties).sort();
    });

    expect(fields[schemas[0]]).toEqual(fields[schemas[1]]);
  });
});
