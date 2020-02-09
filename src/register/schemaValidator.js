"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ValidationError_1 = require("../common/errors/ValidationError");
const appolo_engine_1 = require("appolo-engine");
const index_1 = require("appolo-utils/index");
let SchemaValidator = class SchemaValidator {
    async validate(value, validators, options) {
        let result = await index_1.Promises.map(validators, validator => this._validateValidator(value, validator));
        let { error } = this._buildError(value, result);
        return { error };
    }
    async _validateValidator(value, validationSchema) {
        let validator = null, isValid = false, message;
        try {
            validator = this._getValidatorInstance(validationSchema.validationClass);
            let params = {
                value,
                options: validationSchema.options || {},
                constraints: validationSchema.constraints || []
            };
            isValid = await validator.validate(params);
            if (!isValid) {
                message = validator.defaultMessage(params);
            }
        }
        catch (e) {
            message = "failed to run validator";
        }
        return { validator, isValid, message };
    }
    _getValidatorInstance(validationClass) {
        let classId = appolo_engine_1.Util.getClassName(validationClass);
        if (this.injector.hasDefinition(classId)) {
            return this.injector.get(classId);
        }
        return new validationClass();
    }
    _buildError(value, validatorsResults) {
        //TODO refactor create error
        let error = new ValidationError_1.ValidationError({ value }), isValid = true;
        for (let i = 0; i < validatorsResults.length; i++) {
            let validatorResult = validatorsResults[i];
            if (!validatorResult.isValid) {
                isValid = false;
                error.constraints[validatorResult.validator ? validatorResult.validator.name : "unknown"] = validatorResult.message;
            }
        }
        return { error: isValid ? null : error };
    }
};
tslib_1.__decorate([
    appolo_engine_1.inject()
], SchemaValidator.prototype, "injector", void 0);
SchemaValidator = tslib_1.__decorate([
    appolo_engine_1.define(),
    appolo_engine_1.singleton()
], SchemaValidator);
exports.SchemaValidator = SchemaValidator;
//# sourceMappingURL=schemaValidator.js.map