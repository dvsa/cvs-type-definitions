import { readFileSync } from "fs";
import { Schema } from "../../../schema-validator";

const readFile = (path: Schema) => {
  return JSON.parse(readFileSync(`json-schemas/${path}`).toString("utf-8"));
};

describe("should have the same length of keys regardless of status", () => {
  it("put trl", () => {
    const schemas: Schema[] = [
      "v3/tech-record/put/trl/complete/index.json",
      "v3/tech-record/put/trl/testable/index.json",
      "v3/tech-record/put/trl/skeleton/index.json",
    ];
    const fields: Partial<Record<Schema, string[]>> = {};
    schemas.forEach((path) => {
      fields[path] = Object.keys(readFile(path).properties).sort();
    });

    expect(fields[schemas[0]]).toEqual(fields[schemas[1]]);
    expect(fields[schemas[1]]).toEqual(fields[schemas[2]]);
  });

  it("get trl", () => {
    const schemas: Schema[] = [
      "v3/tech-record/get/trl/complete/index.json",
      "v3/tech-record/get/trl/testable/index.json",
      "v3/tech-record/get/trl/skeleton/index.json",
    ];
    const fields: Partial<Record<Schema, string[]>> = {};
    schemas.forEach((path) => {
      fields[path] = Object.keys(readFile(path).properties).sort();
    });

    expect(fields[schemas[0]]).toEqual(fields[schemas[1]]);
    expect(fields[schemas[1]]).toEqual(fields[schemas[2]]);
  });
});
