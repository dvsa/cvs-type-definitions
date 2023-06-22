import { isValidObject } from "../../src/schema-validation/schema-validator";
import * as hgvData from "../resources/data/hgvTestable.json";

const schemaName = "v3/tech-record/get/hgv/testable/index.json";

describe("validate testable hgv schema", () => {
  it("should validate when given full data for complete", () => {
    const data = hgvData[0];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(true);
  });
  it("should pass and strip if an extra field is given", () => {
    const data = hgvData[1];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(true);
    expect(data).not.toHaveProperty("foo");
  });
  it("should pass validation when given just required fields", () => {
    const data = hgvData[2];
    const res = isValidObject(schemaName, data, true);
    expect(res).toEqual(true);
  });
  it("should fail when missing a required field, systemNumber", () => {
    const data = hgvData[3];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(false);
  });
  it("should fail if there is a validator wrong, techRecord_noOfAxles is too high", () => {
    const data = hgvData[4];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(false);
  });
});
