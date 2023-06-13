import { isValidObject } from '../src/schema-validation/schema-validator'

describe('test schema validation', () => {
    it('should return false when passed and empty object', () => {
        const res = isValidObject('v3/tech-record/get/psv/skeleton', {})
        expect(res).toBe(false)
    })
})