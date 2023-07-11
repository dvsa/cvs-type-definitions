import { isValidObject } from "../schema-validator";

describe("test schema validation", () => {
  it("should return false when passed and empty object", () => {
    const res = isValidObject("v3/tech-record/get/psv/skeleton/index.json", {});
    expect(res).toBe(false);
  });

  it("should remove pieces of data that are not being validated", () => {
    const data = { foo: "bar" };
    const res = isValidObject(
      "v3/tech-record/get/psv/skeleton/index.json",
      data
    );
    expect(data).toEqual({});
    expect(res).toBe(false);
  });
});
