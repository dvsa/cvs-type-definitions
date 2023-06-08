import { mkdirSync, readdirSync, rmSync, writeFileSync } from "fs";

const json2ts = require("json-schema-to-typescript");
const derefSchema = require("json-schema-deref-sync");
const prettyJs = require("pretty-js");

const jsonSchemaDirName = "json-schemas";
const typesDirName = "types";
const definitionsDirName = "json-definitions";

const options = {
  indent: "\t",
  newline: "\r\n",
  quoteProperties: "true",
};

async function generateTypescriptInterface(schemaLocation: string) {
  const saveToLocation = schemaLocation
    .replace(definitionsDirName, typesDirName)
    .replace(".json", ".d.ts");
  const types = await json2ts.compileFromFile(schemaLocation, {
    unreachableDefinitions: true,
  });
  writeFile(saveToLocation, types);
  console.log(
    `********** types generated for ${schemaLocation} and saved to ${saveToLocation} **********`
  );
}

function deReferenceJsonSchema(schemaLocation: string): void {
  const derefSchemaPath = schemaLocation.replace(
    definitionsDirName,
    jsonSchemaDirName
  );
  const originalSchema = require(schemaLocation);
  const baseFolder = schemaLocation.substring(
    0,
    schemaLocation.lastIndexOf("/")
  );
  const deReferencedJsonSchema = derefSchema(originalSchema, {
    baseFolder: baseFolder,
  });
  const deReferencedSchema = prettyJs(
    JSON.stringify(deReferencedJsonSchema),
    options
  );
  writeFile(derefSchemaPath, deReferencedSchema);
}

function writeFile(path: string, data: string) {
  const baseFolder = path.substring(0, path.lastIndexOf("/"));
  mkdirSync(baseFolder, { recursive: true });
  writeFileSync(path, data, "utf8");
}

function sanitiseFolders(): void {
  try {
    rmSync(typesDirName, { recursive: true });
    rmSync(jsonSchemaDirName, { recursive: true });
  } catch {}
}

const isFolder = (name: string) => !name.includes(".");

function generateTypesAndSchemaInFolder(path: string) {
  sanitiseFolders();
  const folderContents = readdirSync(path, "utf-8");
  folderContents.forEach((item) => {
    const definitionFullPath = `${path}/${item}`;
    if (isFolder(item)) {
      generateTypesAndSchemaInFolder(definitionFullPath);
    } else {
      deReferenceJsonSchema(definitionFullPath);
      if (!item.includes(".ignore")) {
        generateTypescriptInterface(definitionFullPath);
      }
    }
  });
}
/**
 * Generate typescript files from json definitions
 */
generateTypesAndSchemaInFolder(definitionsDirName);
