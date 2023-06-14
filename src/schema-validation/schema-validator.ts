import Ajv from "ajv";
import { schemas } from "../../schemas";

export type Schema = typeof schemas[number];

export const isValidObject = (
  schemaName: Schema,
  objectToValidate: object,
  logErrors = false
): boolean => {
  const ajv = new Ajv({ removeAdditional: true, allErrors: true });
  const schemaPath = `json-schemas/${schemaName}`;
  const schema = require(schemaPath);

  const validateFunction = ajv.compile(schema);
  const isValid = validateFunction(objectToValidate);

  if(logErrors && validateFunction.errors){
    console.error(validateFunction.errors)
  }

 return isValid


};
