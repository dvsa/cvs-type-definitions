import Ajv, { ErrorObject } from "ajv";
import { readFileSync } from "fs";
import { schemas } from "./schemas";

export type Schema = typeof schemas[number];
/**
 * Validate an object according to a JSON schema
 * @param {Schema} schemaName `enum` - the name of the JSON schema to validate against
 * @param {object} objectToValidate `object` - the object to validate
 * @param {boolean | undefined} returnErrors `boolean` - Optional. Toggles between returning a boolean or the validation errors. Defaults to false.
 * @param {boolean | undefined} logErrors `boolean` - Optional. Toggles the logging of errors to the console. Defaults to false.
 * @returns {boolean | ErrorObject[]}`boolean | validationErrors`, depending on `returnErrors` flag.
 */
export function isValidObject<B extends boolean | undefined>(
  schemaName: Schema,
  objectToValidate: object
): boolean;
export function isValidObject<B extends boolean | undefined>(
  schemaName: Schema,
  objectToValidate: object,
  returnErrors: B
): B extends false ? boolean : ErrorObject[];
export function isValidObject<B extends boolean | undefined>(
  schemaName: Schema,
  objectToValidate: object,
  returnErrors: B,
  logErrors: boolean | undefined
): B extends false ? boolean : ErrorObject[];
export function isValidObject<B extends boolean | undefined>(
  schemaName: Schema,
  objectToValidate: object,
  returnErrors?: B,
  logErrors = false
): boolean | ErrorObject[] {
  const ajv = new Ajv({ removeAdditional: true, allErrors: true });
  ajv.addKeyword('tsEnumNames');
  const schema = JSON.parse(
    readFileSync(`${__dirname}/json-schemas/${schemaName}`, "utf8")
  );
  const validateFunction = ajv.compile(schema);
  const isValid = validateFunction(objectToValidate);

  if (logErrors && validateFunction.errors) {
    console.error(validateFunction.errors);
  }

  if (returnErrors) {
    return validateFunction.errors ?? [];
  }

  return isValid;
}
