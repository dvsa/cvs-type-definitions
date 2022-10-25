import { schemas } from '../schemas';
const Enjoi = require('enjoi');

export type Schema = typeof schemas[number];

export const isValidObject = (schemaName: Schema, objectToValidate: object): boolean => {
  const schemaFile = require(`../json-definitions/${schemaName}/index.json`);
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
