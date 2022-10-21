import {schemas} from './schemas';

const json2ts = require('json-schema-to-typescript');
const fs = require('fs');
const derefSchema = require('json-schema-deref-sync');
const prettyJs = require('pretty-js');

const jsonSchemaDirName = 'json-schemas';
const typesDirName = 'types';
const definitionsDirName = 'json-definitions';

const options = {
  indent: "\t",
  newline: "\r\n",
  quoteProperties: "true"
};

async function generateTypescriptInterface(schemaLocation: string) {
  const derefSchemaPath = schemaLocation
    .replace(definitionsDirName, jsonSchemaDirName)
  const saveToLocation = schemaLocation
    .replace(definitionsDirName, typesDirName)
    .replace('.json', '.d.ts')
  deReferenceJsonSchema(schemaLocation, derefSchemaPath);
  const types = await json2ts.compileFromFile(schemaLocation, {
    unreachableDefinitions: true
  });
  fs.writeFileSync(saveToLocation, types);
  console.log(`********** types generated for ${schemaLocation} and saved to ${saveToLocation} **********`);
}

function deReferenceJsonSchema(sourcePath: string, targetPath: string): void {
  const originalSchema = require(sourcePath);
  const baseFolder = sourcePath.substring(0, sourcePath.lastIndexOf("/"));
  let deReferencedJsonSchema = derefSchema(originalSchema, {
    baseFolder: baseFolder,
  });
  let deReferencedSchema = prettyJs(JSON.stringify(deReferencedJsonSchema), options);
  fs.writeFileSync(targetPath, deReferencedSchema, 'utf8', (err: any) => {
    if (err) {
      console.error(`unable to write to file ${targetPath}`);
    }
  })
}

function deleteTypes() {
  fs.rmdirSync(typesDirName, {recursive: true}, (err:any) => {
    console.error(err)
  });
  fs.rmdirSync(jsonSchemaDirName, {recursive: true}, (err:any) => {
    console.error(err)
  });
}

function generateInterfaces(typeNames: string[]): void {
  deleteTypes();
  fs.mkdirSync(typesDirName);
  fs.mkdirSync(jsonSchemaDirName);
  typeNames.forEach((typeName) => {
    fs.mkdirSync(`${typesDirName}/${typeName}`)
    fs.mkdirSync(`${jsonSchemaDirName}/${typeName}`)
    generateTypescriptInterface(`./${definitionsDirName}/${typeName}/index.json`);
  });

}

/**
 * Generate typescript files from json definitions
 */
generateInterfaces(schemas);







