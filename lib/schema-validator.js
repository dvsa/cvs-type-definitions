"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidObject = void 0;
var ajv_1 = require("ajv");
var fs_1 = require("fs");
function isValidObject(schemaName, objectToValidate, returnErrors, logErrors) {
    var _a;
    if (logErrors === void 0) { logErrors = false; }
    var ajv = new ajv_1.default({ removeAdditional: true, allErrors: true });
    ajv.addKeyword('tsEnumNames');
    var schema = JSON.parse((0, fs_1.readFileSync)("".concat(__dirname, "/json-schemas/").concat(schemaName), "utf8"));
    var validateFunction = ajv.compile(schema);
    var isValid = validateFunction(objectToValidate);
    if (logErrors && validateFunction.errors) {
        console.error(validateFunction.errors);
    }
    if (returnErrors) {
        return (_a = validateFunction.errors) !== null && _a !== void 0 ? _a : [];
    }
    return isValid;
}
exports.isValidObject = isValidObject;
