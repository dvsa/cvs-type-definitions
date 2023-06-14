import { isValidObject } from "../../src/schema-validation/schema-validator"
import * as psvData from "../resources/data/psv.json"

const schemaName = 'v3/tech-record/get/psv/complete/index.json'

describe('validate complete psv schema', () => {
    it('should validate when given full data', () => {
        const data = psvData[0]
        const res = isValidObject(schemaName, data)
        expect(res).toEqual(true)
    })
    xit('should pass and strip if an extra field is given', () => {
        const data = {}
        const res = isValidObject(schemaName, data)
        expect(res).toEqual(true)
    })
    xit('should pass if missing a non required field', () => {
        const data = {}
        const res = isValidObject(schemaName, data)
        expect(res).toEqual(true)
    })
    xit('should fail when missing a required field', () => {
        const data = {}
        const res = isValidObject(schemaName, data)
        expect(res).toEqual(false)
    })
    xit('should fail if there is a validator wrong', () => {
        const data = {}
        const res = isValidObject(schemaName, data)
        expect(res).toEqual(false)
    })
})