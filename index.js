"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const appolo_engine_1 = require("appolo-engine");
const appolo_utils_1 = require("appolo-utils");
const isNumberValidator_1 = require("./src/validators/isNumberValidator");
exports.IsNumberValidator = isNumberValidator_1.IsNumberValidator;
const defaults_1 = require("./src/defaults/defaults");
const validator_1 = require("./src/validator/validator");
exports.Validator = validator_1.Validator;
async function createValidator(options = {}) {
    let app = appolo_engine_1.createApp({ root: __dirname });
    app.injector.addObject("options", appolo_utils_1.Objects.defaults({}, options, defaults_1.ValidatorDefaults));
    await app.launch();
    let server = app.injector.get(validator_1.Validator);
    return server;
}
exports.createValidator = createValidator;
//# sourceMappingURL=index.js.map