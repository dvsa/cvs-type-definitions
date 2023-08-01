import { isValidObject } from "../../schema-validator";
import * as trlData from "../resources/data/trlTestable.json";

const schemaName = "v3/tech-record/get/trl/testable/index.json";

describe("validate testable trl schema", () => {
  it("should validate when given full data for complete", () => {
    const data: object = trlData[0];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(true);
  });
  it("should pass and strip if an extra field is given", () => {
    const data: object = trlData[1];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(true);
    expect(data).not.toHaveProperty("foo");
  });
  it("should pass validation when given just required fields", () => {
    const data: object = trlData[2];
    const res = isValidObject(schemaName, data, true);
    expect(res).toEqual([]);
  });
  it("should fail when missing a required field, systemNumber", () => {
    const data: object = trlData[3];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(false);
  });
  it("should fail if there is a validator wrong, techRecord_noOfAxles is too high", () => {
    const data: object = trlData[4];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(false);
  });
});
