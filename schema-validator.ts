import Ajv from "ajv";
import { schemas } from "./schemas";
import { readFileSync } from "fs";

export type Schema = typeof schemas[number];

export const isValidObject = (
  schemaName: Schema,
  objectToValidate: object,
  logErrors = false,
  returnErrors = false,
): unknown => {
  const ajv = new Ajv({ removeAdditional: true, allErrors: true });
  const schema = JSON.parse(
    readFileSync(`${__dirname}/json-schemas/${schemaName}`, "utf8")
  );
  const validateFunction = ajv.compile(schema);
  const isValid = validateFunction(objectToValidate);

  if (logErrors && validateFunction.errors) {
    console.error(validateFunction.errors);
  }

  if (returnErrors && validateFunction.errors) {
    return validateFunction.errors;
  }

  return isValid;
};
