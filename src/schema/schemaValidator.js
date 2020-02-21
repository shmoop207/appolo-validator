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
        let { blackList, parallel, whiteList } = this._distributeConstraint(schema.constraints);
        if (await this._checkWhiteListConstraint(whiteList)) {
            return { errors: [], value };
        }
        let blackListError = await this._checkBlackListConstraint(blackList);
        if (blackListError) {
            return { errors: [blackListError], value };
        }
        let errors = await this._checkParallelConstraint(parallel);
        return { errors, value };
    }
    async _checkWhiteListConstraint(whiteList) {
        if (whiteList.length == 0) {
            return false;
        }
        let result = await appolo_utils_1.Promises.someResolved(whiteList.map(item => this._validateConstraint(item)), { fn: value => !value });
        return result.length > 0;
    }
    async _checkBlackListConstraint(blackList) {
        if (blackList.length == 0) {
            return null;
        }
        let result = await appolo_utils_1.Promises.someRejected(blackList.map(item => this._validateConstraint(item)), { fn: value => !value });
        if (!result.length) {
            return null;
        }
        return result[0].reason;
    }
    _distributeConstraint(validators) {
        let blackList = [], whiteList = [], parallel = [];
        for (let i = 0; i < validators.length; i++) {
            let validator = validators[i];
            validator.blackList
                ? blackList.push(validator)
                : validator.whiteList ? whiteList.push(validator) : parallel.push(validator);
        }
        return { blackList, whiteList, parallel };
    }
    async _checkParallelConstraint(constraintSchema) {
        let errors = await appolo_utils_1.Promises.map(constraintSchema, constraintSchema => this._validateConstraint(constraintSchema));
        return appolo_utils_1.Arrays.compact(errors);
    }
    async _validateConstraint(constraintSchema) {
        let constraint = null, error, message;
        if (!this._checkValidGroups(constraintSchema.options.groups)) {
            return null;
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
                return null;
            }
            error = result.error || this._createError(constraint.defaultMessage(params), constraint.type);
        }
        catch (e) {
            error = this._createError("failed to run validator", "unknown");
        }
        return error;
    }
    _createError(message, type) {
        let error = new ValidationError_1.ValidationError();
        error.value = this._value;
        error.message = message;
        error.type = type;
        error.property = this._options.property;
        error.target = this._options.object;
        return error;
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
    _buildError(validatorsResults) {
        let isValid = true, error = this._createError("failed to validate", "");
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