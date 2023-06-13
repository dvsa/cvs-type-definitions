import Ajv from "ajv"
import { schemas } from '../../schemas';

export type Schema = typeof schemas[number];

const isValidObject = (schemaName: string, objectToValidate: object): boolean => {

  const ajv = new Ajv({removeAdditional: true})
  const schemaPath = `json-schemas/${schemaName}/index.json`
  const schema = require(schemaPath)

  const validate = ajv.compile(schema)

  try {
    return validate(objectToValidate)
  } catch (err) {
    throw err
  }
}

console.log(isValidObject('v3/tech-record/get/psv/skeleton', {}))

