"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_engine_1 = require("appolo-engine");
const schema_1 = require("../register/schema");
const index_1 = require("appolo-utils/index");
const defaults_1 = require("../defaults/defaults");
let Validator = class Validator {
    schema(options = {}) {
        options = index_1.Objects.defaults({}, options, this.options, defaults_1.SchemaDefaults, defaults_1.ValidatorDefaults);
        return this.createSchema(options);
    }
};
tslib_1.__decorate([
    appolo_engine_1.inject()
], Validator.prototype, "options", void 0);
tslib_1.__decorate([
    appolo_engine_1.injectFactoryMethod(schema_1.Schema)
], Validator.prototype, "createSchema", void 0);
Validator = tslib_1.__decorate([
    appolo_engine_1.define()
], Validator);
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map