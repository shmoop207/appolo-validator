"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const appolo_engine_1 = require("appolo-engine");
const appolo_utils_1 = require("appolo-utils");
const defaults_1 = require("./src/defaults/defaults");
const validator_1 = require("./src/validator/validator");
exports.Validator = validator_1.Validator;
const schema_1 = require("./src/schema/schema");
async function validator(options = {}) {
    let app = appolo_engine_1.createApp({ root: __dirname });
    app.injector.addObject("options", appolo_utils_1.Objects.defaults({}, options, defaults_1.ValidatorDefaults));
    await app.launch();
    let server = app.injector.get(validator_1.Validator);
    return server;
}
exports.validator = validator;
function schema(options) {
    return new schema_1.Schema(options);
}
exports.schema = schema;
//TODO custom message
//TODO required
//TODO optional
//TODO custom convert
//TODO ref
//# sourceMappingURL=index.js.map