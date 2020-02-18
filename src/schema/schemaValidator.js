"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ValidationError_1 = require("../common/errors/ValidationError");
const appolo_engine_1 = require("appolo-engine");
const appolo_utils_1 = require("appolo-utils");
let SchemaValidator = class SchemaValidator {
    async validate(value, schema, options) {
        if (options.convert) {
            value = await schema.convert(value);
        }
        this._options = options;
        this._schema = schema;
        this._value = value;
        this._groupsIndex = appolo_utils_1.Arrays.keyBy(options.groups || []);
        let result = await appolo_utils_1.Promises.map(schema.validators, constraintSchema => this._validateConstraint(constraintSchema));
        let { error } = this._buildError(value, result);
        return { error, value };
    }
    async _validateConstraint(constraintSchema) {
        let constraint = null, error, message;
        if (!this._checkValidGroups(constraintSchema.options.groups)) {
            return { isValid: true };
        }
        let params = {
            value: this._value,
            options: constraintSchema.options || {},
            args: constraintSchema.args || [],
            validator: this.validator,
            property: this._options.property,
            object: this._options.object,
            validateOptions: this._options
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
            error.value = this._value;
            error.message = message || constraint.defaultMessage(params);
            error.type = constraint ? constraint.type : "unknown";
            error.property = this._options.property;
            error.target = this._options.object;
        }
        return { isValid: false, error };
    }
    _checkValidGroups(constraintGroups) {
        if (!this._options.groups || !this._options.groups.length || !constraintGroups || !constraintGroups.length) {
            return true;
        }
        let validGroups = constraintGroups.every(group => !!this._groupsIndex[group]);
        return validGroups;
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
    appolo_engine_1.define()
], SchemaValidator);
exports.SchemaValidator = SchemaValidator;
//# sourceMappingURL=schemaValidator.js.map