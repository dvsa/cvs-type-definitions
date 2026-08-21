import { isValidObject } from '../../schema-validator';
import * as CompleteActivity from '../resources/data/activity/complete.json';
import * as ConditionalTestEmailActivity from '../resources/data/activity/conditional-tester-email.json';
import * as InvalidFieldFormatActivity from '../resources/data/activity/invalid-field-formats.json';
import * as MinRequiredActivity from '../resources/data/activity/minimum-required.json';
import * as MissingRequiredActivity from '../resources/data/activity/missing-required.json';

const schemaName = 'v1/activity/index.json';

describe('validate activity schema', () => {
	describe('valid', () => {
		test('should validate an object which with complete data', () => {
			const data = CompleteActivity;
			const res = isValidObject(schemaName, data);
			expect(res).toEqual(true);
		});

		test('should validate an object which with partial data with all required feels', () => {
			const data = MinRequiredActivity;
			const res = isValidObject(schemaName, data);
			expect(res).toEqual(true);
		});
	});

	describe('invalid', () => {
		test('should return error message when missing mandatory field', () => {
			const data = MissingRequiredActivity;
			const res = isValidObject(schemaName, data, true);
			expect(res).toEqual([
				{
					instancePath: '',
					keyword: 'required',
					message: "must have required property 'activityType'",
					params: {
						missingProperty: 'activityType',
					},
					schemaPath: '#/required',
				},
			]);
		});

		test('should return error when the email is a bad format', () => {
			const data = InvalidFieldFormatActivity;
			const res = isValidObject(schemaName, data);
			expect(res).toEqual(false);
		});
	});

	describe('validation', () => {
		test('should mandate testerEmail when activityType is visit', () => {
			const data = {
				...ConditionalTestEmailActivity,
				activityType: 'visit',
				testerEmail: 'hello@gmail.com',
			};
			const res = isValidObject(schemaName, data);
			expect(res).toEqual(true);
		});

		test('should fail when start time is empty', () => {
			const data = {
				...ConditionalTestEmailActivity,
				startTime: '',
			};
			const res = isValidObject(schemaName, data);
			expect(res).toEqual(false);
		});

		test('should fail when start time is just whitespace', () => {
			const data = {
				...ConditionalTestEmailActivity,
				startTime: ' ',
			};
			const res = isValidObject(schemaName, data);
			expect(res).toEqual(false);
		});
	});
});
