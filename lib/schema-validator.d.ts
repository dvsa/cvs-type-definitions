import { ErrorObject } from "ajv";
import { schemas } from "./schemas";
export declare type Schema = typeof schemas[number];
/**
 * Validate an object according to a JSON schema
 * @param {Schema} schemaName `enum` - the name of the JSON schema to validate against
 * @param {object} objectToValidate `object` - the object to validate
 * @param {boolean | undefined} returnErrors `boolean` - Optional. Toggles between returning a boolean or the validation errors. Defaults to false.
 * @param {boolean | undefined} logErrors `boolean` - Optional. Toggles the logging of errors to the console. Defaults to false.
 * @returns {boolean | ErrorObject[]}`boolean | validationErrors`, depending on `returnErrors` flag.
 */
export declare function isValidObject<B extends boolean | undefined>(schemaName: Schema, objectToValidate: object): boolean;
export declare function isValidObject<B extends boolean | undefined>(schemaName: Schema, objectToValidate: object, returnErrors: B): B extends false ? boolean : ErrorObject[];
export declare function isValidObject<B extends boolean | undefined>(schemaName: Schema, objectToValidate: object, returnErrors: B, logErrors: boolean | undefined): B extends false ? boolean : ErrorObject[];
