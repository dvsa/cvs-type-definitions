import { isValidObject } from "../../schema-validator";
import * as hgvData from "../resources/data/hgvSkeleton.json";

const schemaName = "v3/tech-record/get/hgv/skeleton/index.json";

describe("validate skeleton hgv schema", () => {
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
    expect(res).toEqual([]);
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
describe("validate ADR hgv schema", () => {
  it("should fail if adr fields are missing when adr is Yes", () => {
    const data = hgvData[5];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(false);
  });
  it("should pass if adr fields are missing when adr is No", () => {
    const data = hgvData[5];
    (data as any).techRecord_adrDetails_dangerousGoods = false;
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(true);
  });
  it("should pass if adr fields are present when adr is Yes", () => {
    const data = hgvData[6];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(true);
  });
  it("should fail if compatibilityGroupJ is missing when permitted goods is Explosives type 2 or 3", () => {
    const data = hgvData[6];
    data.techRecord_adrDetails_permittedDangerousGoods = ["Explosives (type 2)"];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(false);
  });
  it("should pass if compatibilityGroupJ is present when permitted goods is Explosives type 2 or 3", () => {
    const data = hgvData[6];
    data.techRecord_adrDetails_permittedDangerousGoods = ["Explosives (type 3)"];
    (data as any).techRecord_adrDetails_compatibilityGroupJ = "I";
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(true);
  });
  it("should fail if techRecord_adrDetails_vehicleDetails_type is tank or battery but tank details are missing", () => {
    const data = hgvData[6];
    data.techRecord_adrDetails_vehicleDetails_type = "Semi trailer battery";
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(false);
  });
  it("should pass if techRecord_adrDetails_vehicleDetails_type is tank or battery and tank details are present", () => {
    const data = hgvData[7];
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(true);
  });
  it("should fail if techRecord_adrDetails_listStatementApplicable is true but reference number is missing", () => {
    const data = hgvData[7];
    data.techRecord_adrDetails_vehicleDetails_type = "Rigid battery";
    (data as any).techRecord_adrDetails_listStatementApplicable = true;
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(false);
  });
  it("should pass if techRecord_adrDetails_listStatementApplicable is true and reference number is present", () => {
    const data = hgvData[7];
    data.techRecord_adrDetails_vehicleDetails_type = "Rigid battery";
    (data as any).techRecord_adrDetails_listStatementApplicable = true;
    (data as any).techRecord_adrDetails_batteryListNumber = "12345678";
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(true);
  });

  it("should fail if techRecord_adrDetails_brakeEndurance is true but weight is missing", () => {
    const data = hgvData[7];
    (data as any).techRecord_adrDetails_brakeEndurance = true;
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(false);
  });
  it("should pass if techRecord_adrDetails_brakeEndurance is true and weight is present", () => {
    const data = hgvData[7];
    (data as any).techRecord_adrDetails_brakeEndurance = true;
    (data as any).techRecord_adrDetails_weight = "123";
    const res = isValidObject(schemaName, data);
    expect(res).toEqual(true);
  });
});
