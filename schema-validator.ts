import Ajv, { ErrorObject } from "ajv";
import { readFileSync } from "fs";
import { schemas } from "./schemas";

export type Schema = typeof schemas[number];

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
  returnErrors?: B,
  logErrors = false
): boolean | ErrorObject[] {
  const ajv = new Ajv({ removeAdditional: true, allErrors: true });
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
