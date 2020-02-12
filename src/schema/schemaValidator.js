"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ValidationError_1 = require("../common/errors/ValidationError");
const appolo_engine_1 = require("appolo-engine");
const index_1 = require("appolo-utils/index");
let SchemaValidator = class SchemaValidator {
    async validate(value, schema, options) {
        if (options.convert) {
            value = await schema.convert(value);
        }
        let result = await index_1.Promises.map(schema.validators, validator => this._validateValidator(value, validator, options));
        let { error } = this._buildError(value, result);
        return { error, value };
    }
    async _validateValidator(value, constraintSchema, options) {
        let constraint = null, error, message;
        let params = {
            value,
            options: constraintSchema.options || {},
            args: constraintSchema.args || [],
            validator: this.validator,
            property: options.property,
            object: options.object,
            validateOptions: options
        };
        try {
            constraint = this._getConstraintInstance(constraintSchema.constraint);
            let result = await constraint.validate(params);
            if (result.isValid) {
                return { isValid: true };
            }
            error = result.error;
        }
        catch (e) {
            message = "failed to run validator";
        }
        if (!error) {
            error = new ValidationError_1.ValidationError();
            error.value = value;
            error.message = message || constraint.defaultMessage(params);
            error.type = constraint ? constraint.type : "unknown";
            error.property = options.property;
            error.target = options.object;
        }
        return { isValid: false, error };
    }
    _getConstraintInstance(constraintClass) {
        let classId = appolo_engine_1.Util.getClassName(constraintClass);
        if (this.injector.hasDefinition(classId)) {
            return this.injector.get(classId);
        }
        return new constraintClass();
    }
    _buildError(value, validatorsResults) {
        let isValid = true, error = new ValidationError_1.ValidationError();
        for (let i = 0; i < validatorsResults.length; i++) {
            let validatorResult = validatorsResults[i];
            if (!validatorResult.isValid) {
                isValid = false;
                error.constraints.push(validatorResult.error);
            }
        }
        if (isValid) {
            return { error: null };
        }
        error.message = "failed to validate";
        return { error };
    }
};
tslib_1.__decorate([
    appolo_engine_1.inject()
], SchemaValidator.prototype, "injector", void 0);
tslib_1.__decorate([
    appolo_engine_1.inject()
], SchemaValidator.prototype, "validator", void 0);
SchemaValidator = tslib_1.__decorate([
    appolo_engine_1.define(),
    appolo_engine_1.singleton()
], SchemaValidator);
exports.SchemaValidator = SchemaValidator;
//# sourceMappingURL=schemaValidator.js.map