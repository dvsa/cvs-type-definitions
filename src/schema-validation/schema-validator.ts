import Ajv from "ajv";
import { schemas } from "../../schemas";

export type Schema = typeof schemas[number];

export const isValidObject = (
  schemaName: Schema,
  objectToValidate: object
): boolean => {
  const ajv = new Ajv({ removeAdditional: true, allErrors: true });
  const schemaPath = `json-schemas/${schemaName}`;
  const schema = require(schemaPath);

  const validate = ajv.compile(schema);

  return validate(objectToValidate);
};
