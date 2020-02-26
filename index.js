"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const appolo_engine_1 = require("appolo-engine");
const appolo_utils_1 = require("appolo-utils");
const defaults_1 = require("./src/defaults/defaults");
const validator_1 = require("./src/validator/validator");
exports.Validator = validator_1.Validator;
const anySchema_1 = require("./src/schema/types/anySchema");
exports.any = anySchema_1.any;
const numberSchema_1 = require("./src/schema/types/numberSchema");
exports.number = numberSchema_1.number;
const stringSchema_1 = require("./src/schema/types/stringSchema");
exports.string = stringSchema_1.string;
const arraySchema_1 = require("./src/schema/types/arraySchema");
exports.array = arraySchema_1.array;
const objectSchema_1 = require("./src/schema/types/objectSchema");
exports.object = objectSchema_1.object;
const ref_1 = require("./src/schema/types/ref");
exports.ref = ref_1.ref;
const when_1 = require("./src/constraints/when/when");
exports.when = when_1.when;
const orConstraint_1 = require("./src/constraints/any/orConstraint");
exports.or = orConstraint_1.or;
async function validation(options = {}) {
    let app = appolo_engine_1.createApp({ root: __dirname });
    app.injector.addObject("options", appolo_utils_1.Objects.defaults({}, options, defaults_1.ValidatorDefaults));
    await app.launch();
    let server = app.injector.get(validator_1.Validator);
    return server;
}
exports.validation = validation;
//TODO custom message
//TODO ValidateIf
//# sourceMappingURL=index.js.map