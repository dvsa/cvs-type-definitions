import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import $RefParser from '@apidevtools/json-schema-ref-parser';
import { compileFromFile } from 'json-schema-to-typescript';

const prettyJs = require('pretty-js');

const jsonSchemaDirName = 'json-schemas';
const typesDirName = 'types';
const definitionsDirName = 'json-definitions';

const options = {
	indent: '\t',
	newline: '\r\n',
	quoteProperties: 'true',
};

function stripIndexSignatureIntersection(types: string): string {
	return types.replace(
		/export type (\w+) = \{\n\s*\[k: string\]: unknown;\n\} & \{([\s\S]*?\n)\};/g,
		'export interface $1 {$2}'
	);
}

function replaceObjectValuedEnums(types: string, declarationFile: boolean): string {
	const enumDeclaration = /export (?:const )?enum ([A-Za-z_$][\w$]*) \{/g;
	let result = '';
	let lastIndex = 0;

	for (;;) {
		const match = enumDeclaration.exec(types);
		if (match === null) {
			break;
		}
		let depth = 0;
		let endIndex = -1;

		for (let index = match.index; index < types.length; index += 1) {
			if (types[index] === '{') {
				depth += 1;
			} else if (types[index] === '}') {
				depth -= 1;
				if (depth === 0) {
					endIndex = index + 1;
					break;
				}
			}
		}

		if (endIndex === -1) {
			break;
		}

		const enumDeclarationText = types.slice(match.index, endIndex);
		if (!/=\s*\{/.test(enumDeclarationText)) {
			continue;
		}

		const enumBody = enumDeclarationText
			.slice(enumDeclarationText.indexOf('{') + 1, -1)
			.replace(/^(\s*[^=\n]+?)\s*=\s*/gm, '$1: ');
		const enumName = match[1];
		const objectEnum = declarationFile
			? `export declare const ${enumName}: {\n${enumBody
					.trim()
					.split('\n')
					.map((member) => {
						const memberMatch = member
							.trim()
							.replace(/,$/, '')
							.match(/^(.+?):\s*(\{.*\})$/);
						if (!memberMatch) {
							return member;
						}

						const [, key, value] = memberMatch;
						const properties = value
							.slice(1, -1)
							.split(/,\s*(?=[A-Za-z_$][\w$]*\s*:)/)
							.map((property) => `readonly ${property.trim().replace(/:\s*/, ': ')};`)
							.join(' ');
						return `  ${key}: { ${properties} };`;
					})
					.join('\n')}\n};\n\n` + `export type ${enumName} = (typeof ${enumName})[keyof typeof ${enumName}];`
			: `export const ${enumName} = {${enumBody}} as const;\n\n` +
				`export type ${enumName} = (typeof ${enumName})[keyof typeof ${enumName}];`;

		result += types.slice(lastIndex, match.index) + objectEnum;
		lastIndex = endIndex;
		enumDeclaration.lastIndex = endIndex;
	}

	return result + types.slice(lastIndex);
}

async function generateTypescriptInterface(schemaLocation: string) {
	const fileExt = schemaLocation.includes('enum') ? '.ts' : '.d.ts';
	const saveToLocation = schemaLocation.replace(definitionsDirName, typesDirName).replace('.json', fileExt);

	let types = await compileFromFile(schemaLocation, {
		unreachableDefinitions: true,
		enableConstEnums: false,
	});

	types = stripIndexSignatureIntersection(types);
	types = replaceObjectValuedEnums(types, fileExt === '.d.ts');

	writeFile(saveToLocation, types);
	console.log(`********** types generated for ${schemaLocation} and saved to ${saveToLocation} **********`);
}

async function deReferenceJsonSchema(schemaLocation: string): Promise<void> {
	const derefSchemaPath = schemaLocation.replace(definitionsDirName, jsonSchemaDirName);

	try {
		const bundledSchema = await $RefParser.dereference(schemaLocation);

		const deReferencedSchema = prettyJs(JSON.stringify(bundledSchema), options);

		writeFile(derefSchemaPath, deReferencedSchema);
		console.log(`✅ Schema bundled for: ${schemaLocation}`);
	} catch (error) {
		if ((error as Error).message.includes('Converting circular structure to JSON')) {
			// this is an error thrown by $RefParser when it encounters circular references
			try {
				const bundledSchema = await $RefParser.bundle(schemaLocation);

				const deReferencedSchema = prettyJs(JSON.stringify(bundledSchema), options);

				writeFile(derefSchemaPath, deReferencedSchema);
				console.log(`✅ Schema bundled for: ${schemaLocation}`);
				return;
			} catch (_err) {
				console.error(`❌ Error bundling schema at ${schemaLocation}:`, error);
				return;
			}
		}
		console.error(`❌ Error bundling schema at ${schemaLocation}:`, error);
	}
}

function writeFile(path: string, data: string) {
	const baseFolder = path.substring(0, path.lastIndexOf('/'));
	mkdirSync(baseFolder, { recursive: true });
	writeFileSync(path, data, 'utf8');
}

function sanitiseFolders() {
	try {
		sanitiseTypesFolder(typesDirName);
	} catch (err) {
		console.warn(`⚠️ Could not sanitise types folder: ${(err as Error).message}`);
	}

	try {
		rmSync(jsonSchemaDirName, { recursive: true, force: true });
	} catch (err) {
		console.warn(`⚠️ Could not remove JSON schemas folder: ${(err as Error).message}`);
	}
}

const isFolder = (name: string) => !name.includes('.');

async function generateTypesAndSchemaInFolder(path: string, schemasPath: string[]) {
	const folderContents = readdirSync(path, 'utf-8');

	for (const item of folderContents) {
		const definitionFullPath = `${path}/${item}`;

		if (isFolder(item)) {
			await generateTypesAndSchemaInFolder(definitionFullPath, schemasPath);
		} else if (!item.includes('.ignore')) {
			await deReferenceJsonSchema(definitionFullPath);
			await generateTypescriptInterface(definitionFullPath);

			const removedRootFolder = definitionFullPath.substring(definitionFullPath.indexOf('/') + 1);
			schemasPath.push(removedRootFolder);
		}
	}

	return schemasPath;
}

function sanitiseTypesFolder(directory: string) {
	const contents = readdirSync(directory);

	for (const f of contents) {
		const name = `${directory}/${f}`;

		if (isFolder(f)) {
			sanitiseTypesFolder(name);
		} else {
			const contents = readFileSync(name, { encoding: 'utf-8' });

			if (contents.includes('This file was automatically generated by json-schema-to-typescript')) {
				rmSync(name);
				console.log(`🗑️ Removed generated file: ${name}`);
			}
		}
	}
}

// Defines and maintains an array of valid json schemas for type-safe runtime validation
function generateSchemasArray(paths: string[]) {
	const schemas = `export const schemas = [
  "${paths.join('",\n  "')}",\n] as const;\n`;
	writeFileSync('./schemas.ts', schemas);
}

(async () => {
	console.log('🛠️ Generating TypeScript definitions from JSON Schemas...');

	sanitiseFolders();

	const schemas: string[] = [];
	await generateTypesAndSchemaInFolder(definitionsDirName, schemas);
	generateSchemasArray(schemas);
})();
