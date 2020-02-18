"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_engine_1 = require("appolo-engine");
const schema_1 = require("../schema/schema");
const index_1 = require("appolo-utils/index");
const defaults_1 = require("../defaults/defaults");
const schemaValidator_1 = require("../schema/schemaValidator");
let Validator = class Validator {
    schema(options = {}) {
        options = index_1.Objects.defaults({}, options, this.options, defaults_1.ValidatorDefaults);
        return new schema_1.Schema(options);
    }
    async validate(schema, value, options = {}) {
        options = index_1.Objects.defaults({}, options, schema.options, defaults_1.ValidateDefaults);
        let result = await this.createSchemaValidator().validate(value, schema, options);
        return { error: result.error, value: result.value };
    }
    async validateAndTrow(schema, value, options) {
        let result = await this.validate(value, options);
        if (result.error) {
            throw result.error;
        }
        return result.value;
    }
};
tslib_1.__decorate([
    appolo_engine_1.inject()
], Validator.prototype, "options", void 0);
tslib_1.__decorate([
    appolo_engine_1.injectFactoryMethod(schemaValidator_1.SchemaValidator)
], Validator.prototype, "createSchemaValidator", void 0);
Validator = tslib_1.__decorate([
    appolo_engine_1.define(),
    appolo_engine_1.singleton()
], Validator);
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map