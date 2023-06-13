import Ajv from "ajv"
import { schemas } from '../../schemas';

export type Schema = typeof schemas[number];

const isValidObject = async (schemaName: string, objectToValidate: object): Promise<boolean> => {

  const ajv = new Ajv({removeAdditional: true})
  const schemaPath = `json-schemas/${schemaName}/index.json`
  const schema = await import(schemaPath)

  const validate = ajv.compile(schema)

  try {
    return validate(objectToValidate)
  } catch (err) {
    throw err
  }
}

isValidObject('v3/tech-record/get/psv/skeleton', {}).then((a) => console.log(a))

