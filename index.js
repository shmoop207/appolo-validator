"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const appolo_engine_1 = require("appolo-engine");
const appolo_utils_1 = require("appolo-utils");
const defaults_1 = require("./src/defaults/defaults");
const validator_1 = require("./src/validator/validator");
exports.Validator = validator_1.Validator;
const anySchema_1 = require("./src/types/any/anySchema");
exports.any = anySchema_1.any;
exports.AnySchema = anySchema_1.AnySchema;
const numberSchema_1 = require("./src/types/number/numberSchema");
exports.number = numberSchema_1.number;
const stringSchema_1 = require("./src/types/string/stringSchema");
exports.string = stringSchema_1.string;
const arraySchema_1 = require("./src/types/array/arraySchema");
exports.array = arraySchema_1.array;
const objectSchema_1 = require("./src/types/object/objectSchema");
exports.object = objectSchema_1.object;
const functionSchema_1 = require("./src/types/function/functionSchema");
exports.func = functionSchema_1.func;
const ref_1 = require("./src/schema/ref");
exports.ref = ref_1.ref;
const when_1 = require("./src/when/when");
exports.when = when_1.when;
const bufferSchema_1 = require("./src/types/buffer/bufferSchema");
exports.buffer = bufferSchema_1.buffer;
const booleanSchema_1 = require("./src/types/boolean/booleanSchema");
exports.boolean = booleanSchema_1.boolean;
const orConstraint_1 = require("./src/types/any/constraints/orConstraint");
exports.or = orConstraint_1.or;
const andConstraint_1 = require("./src/types/any/constraints/andConstraint");
exports.and = andConstraint_1.and;
const dateSchema_1 = require("./src/types/date/dateSchema");
exports.date = dateSchema_1.date;
const registerConstraint_1 = require("./src/schema/registerConstraint");
exports.registerConstraint = registerConstraint_1.registerConstraint;
const registerConverter_1 = require("./src/schema/registerConverter");
exports.registerConverter = registerConverter_1.registerConverter;
const decorators_1 = require("./src/decorators/decorators");
exports.schema = decorators_1.schema;
const numberSchema_2 = require("./src/types/number/numberSchema");
exports.NumberSchema = numberSchema_2.NumberSchema;
const stringSchema_2 = require("./src/types/string/stringSchema");
exports.StringSchema = stringSchema_2.StringSchema;
const arraySchema_2 = require("./src/types/array/arraySchema");
exports.ArraySchema = arraySchema_2.ArraySchema;
const objectSchema_2 = require("./src/types/object/objectSchema");
exports.ObjectSchema = objectSchema_2.ObjectSchema;
const booleanSchema_2 = require("./src/types/boolean/booleanSchema");
exports.BooleanSchema = booleanSchema_2.BooleanSchema;
const dateSchema_2 = require("./src/types/date/dateSchema");
exports.DateSchema = dateSchema_2.DateSchema;
const bufferSchema_2 = require("./src/types/buffer/bufferSchema");
exports.BufferSchema = bufferSchema_2.BufferSchema;
const functionSchema_2 = require("./src/types/function/functionSchema");
exports.FunctionSchema = functionSchema_2.FunctionSchema;
const ValidationError_1 = require("./src/common/errors/ValidationError");
exports.ValidationError = ValidationError_1.ValidationError;
const ValidationErrorsError_1 = require("./src/common/errors/ValidationErrorsError");
exports.ValidationErrorsError = ValidationErrorsError_1.ValidationErrorsError;
const registerSchema_1 = require("./src/schema/registerSchema");
exports.registerSchema = registerSchema_1.registerSchema;
const when_2 = require("./src/when/when");
exports.When = when_2.When;
for (let key of appolo_utils_1.Files.walk(__dirname, "src/types", ["js"])) {
    require(key);
}
exports.validate = {
    boolean: booleanSchema_1.boolean, any: anySchema_1.any, buffer: bufferSchema_1.buffer, date: dateSchema_1.date, func: functionSchema_1.func, object: objectSchema_1.object, array: arraySchema_1.array, string: stringSchema_1.string, number: numberSchema_1.number, when: when_1.when, or: orConstraint_1.or
};
async function validation(options = {}) {
    let app = appolo_engine_1.createApp({ root: __dirname });
    app.injector.addObject("options", appolo_utils_1.Objects.defaults({}, options, defaults_1.ValidatorDefaults));
    await app.launch();
    let server = app.injector.get(validator_1.Validator);
    return server;
}
exports.validation = validation;
//# sourceMappingURL=index.js.map