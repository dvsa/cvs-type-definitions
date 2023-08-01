import { isValidObject } from "../../schema-validator";
import * as psvData from "../resources/data/psvSkeleton.json";

const schemaName = "v3/tech-record/put/psv/skeleton/index.json";

describe("validate skeleton psv schema", () => {
  it("should validate when given full data for complete", () => {
    const data = psvData[0];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(true);
  });
  it("should pass and strip if an extra field is given", () => {
    const data = psvData[1];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(true);
    expect(data).not.toHaveProperty("foo");
  });
  it("should pass validation when given just required fields", () => {
    const data = psvData[2];
    const res = isValidObject(schemaName, data, true);
    expect(res).toEqual([]);
  });
  it("should fail when missing a required field, systemNumber", () => {
    const data = psvData[3];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(false);
  });
  it("should fail if there is a validator wrong, techRecord_noOfAxles is too high", () => {
    const data = psvData[4];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(false);
  });
});
