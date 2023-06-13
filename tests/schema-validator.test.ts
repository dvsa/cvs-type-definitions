import { isValidObject } from '../src/schema-validation/schema-validator'

describe('test schema validation', () => {
    it('should return false when passed and empty object', () => {
        const res = isValidObject('v3/tech-record/get/psv/skeleton', {})
        expect(res).toBe(false)
    })

    it('should remove pieces of data that are not being validated', () => {
        const data = { foo: "bar" }
        const res = isValidObject('v3/tech-record/get/psv/skeleton', data)
        expect(data).toEqual({})
        expect(res).toBe(false)
    })  
})