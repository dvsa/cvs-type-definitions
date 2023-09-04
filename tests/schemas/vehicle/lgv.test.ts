import { readFileSync } from "fs";
import { Schema } from "../../../schema-validator";

const readFile = (path: Schema) => {
  return JSON.parse(readFileSync(`json-schemas/${path}`).toString("utf-8"));
};

describe("should have the same length of keys regardless of status", () => {
  it("put lgv", () => {
    const schemas: Schema[] = [
      "v3/tech-record/put/lgv/complete/index.json",
      "v3/tech-record/put/lgv/skeleton/index.json",
    ];
    const fields: Partial<Record<Schema, string[]>> = {};
    schemas.forEach((path) => {
      fields[path] = Object.keys(readFile(path).properties).sort();
    });

    expect(fields[schemas[0]]).toEqual(fields[schemas[1]]);
  });

  it("get lgv", () => {
    const schemas: Schema[] = [
      "v3/tech-record/get/lgv/complete/index.json",
      "v3/tech-record/get/lgv/skeleton/index.json",
    ];
    const fields: Partial<Record<Schema, string[]>> = {};
    schemas.forEach((path) => {
      fields[path] = Object.keys(readFile(path).properties).sort();
    });

    expect(fields[schemas[0]]).toEqual(fields[schemas[1]]);
  });
});
