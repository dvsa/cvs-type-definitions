import { schemas } from '../../schemas';
const Enjoi = require('enjoi');
declare var require: any

export type Schema = typeof schemas[number];

export const isValidObject = (schemaName: Schema, objectToValidate: object): boolean => {
  const schemaPath = `json-schemas/${schemaName}/index.json`
  const schemaFile = require(schemaPath);
  const schema = Enjoi.schema(schemaFile)
  const { error } = schema.validate(<ArrayBufferView | ArrayBuffer>objectToValidate);
  if (error) {
    console.error(`Object failed validation against ${schemaName} Schema. Failures: `)
    error.details.forEach((errorDetail: any) => {
      console.log(errorDetail.message)

    })
  } else {
    console.log('*********schema passes validation********')
  }
  return !error
}

isValidObject('test-result', {});