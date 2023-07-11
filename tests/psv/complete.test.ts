import { isValidObject } from "../../schema-validator";
import * as psvData from "../resources/data/psvComplete.json";

const schemaName = "v3/tech-record/get/psv/complete/index.json";

describe("validate complete psv schema", () => {
  it("should validate when given full data", () => {
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
  it("should pass if missing a non required field, tachoExemptMark", () => {
    const data = psvData[2];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(true);
  });
  it("should fail when missing a required field, systemNumber", () => {
    const data = psvData[3];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(false);
  });
  it("should fail if there is a validator wrong, noOfSeatbelts is wrong type", () => {
    const data = psvData[4];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(false);
  });
});
