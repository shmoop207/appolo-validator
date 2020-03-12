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
const appolo_utils_2 = require("appolo-utils");
const decorators_1 = require("./src/decorators/decorators");
exports.schema = decorators_1.schema;
for (let file of appolo_utils_2.Files.walk(__dirname, "src")) {
    require(file);
}
async function validation(options = {}) {
    let app = appolo_engine_1.createApp({ root: __dirname });
    app.injector.addObject("options", appolo_utils_1.Objects.defaults({}, options, defaults_1.ValidatorDefaults));
    await app.launch();
    let server = app.injector.get(validator_1.Validator);
    return server;
}
exports.validation = validation;
//# sourceMappingURL=index.js.map