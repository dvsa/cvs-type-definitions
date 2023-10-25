import {isValidObject} from "../schema-validator";

describe("test schema validation", () => {
    it("should return false when passed and empty object", () => {
        const res = isValidObject("v3/tech-record/get/psv/skeleton/index.json", {});
        expect(res).toBe(false);
    });

    it("iva defect should return false when passed and empty object", () => {
        const res = isValidObject("iva/defects/get/index.json", {});
        expect(res).toBe(false);
    });

    it("should remove pieces of data that are not being validated", () => {
        const data = {foo: "bar"};
        const res = isValidObject(
            "v3/tech-record/get/psv/skeleton/index.json",
            data
        );
        expect(data).toEqual({});
        expect(res).toBe(false);
    });

    it("should return errors when returnErrors is true", () => {
        const result1 = isValidObject(
            "v3/tech-record/put/car/skeleton/index.json",
            {
                vin: "testVIN",
                techRecord_vehicleType: "123",
                techRecord_statusCode: "provisional",
            },
            true
        );

        expect(result1).toHaveLength(2);
        expect(result1).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    instancePath: "/techRecord_vehicleType",
                    message: "must be equal to constant",
                    params: {allowedValue: "car"},
                }),
                expect.objectContaining({
                    instancePath: "",
                    keyword: "required",
                    message: "must have required property 'techRecord_reasonForCreation'",
                    params: {missingProperty: "techRecord_reasonForCreation"},
                }),
            ])
        );

        const result2 = isValidObject(
            "v3/tech-record/put/car/skeleton/index.json",
            {},
            true
        );
        expect(result2).toHaveLength(4);
        expect(result2).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    instancePath: "",
                    message: "must have required property 'vin'",
                }),
                expect.objectContaining({
                    instancePath: "",
                    message: "must have required property 'techRecord_vehicleType'",
                }),
                expect.objectContaining({
                    instancePath: "",
                    keyword: "required",
                    message: "must have required property 'techRecord_reasonForCreation'",
                    params: {missingProperty: "techRecord_reasonForCreation"},
                }),
                expect.objectContaining({
                    instancePath: "",
                    keyword: "required",
                    message: "must have required property 'techRecord_statusCode'",
                    params: {missingProperty: "techRecord_statusCode"},
                }),
            ])
        );
    });
});
