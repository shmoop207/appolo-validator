"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const utils_1 = require("@appolo/utils");
const defaults_1 = require("../defaults/defaults");
const schemaValidator_1 = require("../schema/schemaValidator");
const ValidationErrorsError_1 = require("../common/errors/ValidationErrorsError");
let Validator = class Validator {
    validate(schema, value, options = {}) {
        let validator = this.createSchemaValidator();
        let schem = schemaValidator_1.SchemaValidator.getSchemaFromParams(schema);
        if (!schem) {
            throw new Error("failed to find schema");
        }
        options = utils_1.Objects.defaults({}, options, schem.getOptions(), this.options, defaults_1.ValidateDefaults);
        return validator.validate(value, schem, options);
    }
    getSchema(schema) {
        return schemaValidator_1.SchemaValidator.getSchemaFromParams(schema);
    }
    async validateAndTrow(schema, value, options) {
        let results = await this.validate(schema, value, options);
        if (results.errors.length == 0) {
            return results.value;
        }
        throw new ValidationErrorsError_1.ValidationErrorsError(results.errors);
    }
};
tslib_1.__decorate([
    inject_1.inject()
], Validator.prototype, "options", void 0);
tslib_1.__decorate([
    inject_1.factoryMethod(schemaValidator_1.SchemaValidator)
], Validator.prototype, "createSchemaValidator", void 0);
Validator = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], Validator);
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map