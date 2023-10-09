# cvs-type-definitions

[json schema](https://json-schema.org/) and .ts type definitions for cvs vta application

# Usage

## Install GitHub package:

- install GitHub package: `npm install @dvsa/cvs-type-definitions@latest`

## Example usage (TS types):

`import { CommercialVehicleTestSchema } from @dvsa/cvs-type-definitions/types/test`

## Example usage (json schemas)

The package exports an `isValidObject()` function which can be used to validate if an object against a specified schema. E.g:

`import { isValidObject } from '@dvsa/cvs-type-definitions/lib/src/schema-validation../../schema-validator';`

`const isValidVisit: boolean = isValidObject('visit', myVisitObject);`

# Updating a schema

Edits should only be made to `json` schema definitions within `json-definitions` directory.

TypeScript interfaces will be generated from these files and saved to `types` directory. De-referenced json schema definitions will be saved to `json-schemas` directory. Only these two directories are published in the npm package.

1. Navigate into the relevant schema (e.g. `./json-definitions/test/index.json`)
2. Edit file
3. Generate the new TypeScript and de-referenced json schema definitions using `npm run generate`
4. Bump the version of the package using `npm version {major|minor|patch}`
5. Publish updates

# Adding a new schema

1. Create a new subdirectory with an appropriate name within the `json-defininitions` directory (e.g. `my-new-schema`)
2. If you do not wish for a type file and a de-referenced schema to be generated for a schema, add `.ignore` in the name of the file (e.g. `my-new-schema.ignore.json`)
3. Generate the new TypeScript definitions using `npm run generate`
4. Bump the version of the package using `npm version {major|minor|patch}`
5. Publish updates

# Publishing a new version

- Raise a PR
- The PR title should start with `major`, `minor` or `patch` and be followed by the character `(`. Doing this ensure the correct version of the package is published to npm. A Github action should enforce the PR title format.
- Add a description of the changes in the `Changelog` section of the PR description
- Once merged to develop, a github action should create a release and publish a new version of that release on npm
