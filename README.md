# cvs-type-definitions
[json schema](https://json-schema.org/) and .ts type definitions for cvs vta application

# Usage

## Install GitHub package:

- Ensure consuming repo is set up to install private DVSA packages by adding the following to the `.npmrc` file:
  `@dvsa:registry=https://npm.pkg.github.com`
- **NOTE:** in order to install private DVSA packages you will need a `.npmrc` file in your `$PATH` containing a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) linked to the DVSA org. You should add the token to your `.npmrc` file as follows:
  - `//npm.pkg.github.com/:_authToken=<AUTH_TOKEN_HERE>`
- install GitHub package: `npm install @dvsa/cvs-type-definitions@latest`

## Example usage (TS types):

`import { CommercialVehicleTestSchema } from @dvsa/cvs-type-definitions/types/test`

## Example usage (json schemas)

The package exports an `isValidObject()` function which can be used to validate an object against a specified schema. E.g:



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
2. Add an `index.json` file to the new directory with appropriate json schema definitions
3. Add the new schema name to the `schemas` constant array in `./schemas.ts` **NOTE:** this MUST match the directory name created at step 1 (`my-new-schema` in the example here)
3. Generate the new TypeScript definitions using `npm run generate`
4. Bump the version of the package using `npm version {major|minor|patch}`
5. Publish updates

# Publishing github package

1. Raise a Pull Request on Github and await approvals
2. Once merged, publish the new package from the latest `develop` branch to GitHub packages using `npm publish` - _You must be logged in and have the correct permissions to publish to the package
