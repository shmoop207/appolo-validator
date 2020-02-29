"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ValidationError_1 = require("../common/errors/ValidationError");
const appolo_engine_1 = require("appolo-engine");
const appolo_utils_1 = require("appolo-utils");
const anySchema_1 = require("./types/anySchema");
const ref_1 = require("./types/ref");
const when_1 = require("../constraints/when/when");
const registerDecorator_1 = require("../decorators/registerDecorator");
const index_1 = require("../../index");
const decorators_1 = require("../decorators/decorators");
let SchemaValidator = class SchemaValidator {
    async validate(value, schema, options) {
        this._options = options;
        this._schema = schema;
        this._value = value;
        this._groupsIndex = appolo_utils_1.Arrays.keyBy(options.groups || []);
        await this._handleConverters(schema, options);
        let { blackList, parallel, whiteList } = this._distributeConstraint(schema.constraints);
        if (whiteList.length && await this._checkWhiteListConstraint(whiteList)) {
            return { errors: [], value };
        }
        if (blackList.length) {
            let blackListError = await this._checkBlackListConstraint(blackList);
            if (blackListError) {
                return { errors: blackListError, value };
            }
        }
        let errors = await this._checkParallelConstraint(parallel);
        return { errors, value: this._value };
    }
    _handleConverters(schema, options) {
        let converters = (schema.converters || []);
        if (options.convert && schema.converter) {
            converters = converters.slice();
            converters.unshift({ converter: schema.converter, args: [] });
        }
        if (converters.length) {
            return this._runConverters(converters);
        }
    }
    async _runConverters(converters) {
        for (let i = 0; i < converters.length; i++) {
            let converter = converters[i];
            await this._convertValue(converter);
        }
    }
    async _convertValue(converterSchema) {
        try {
            let converter = this._getInstance(converterSchema.converter);
            let params = this._createValidationParams(converterSchema.options, converterSchema.args);
            let value = await converter.convert(params);
            this._value = value;
        }
        catch (e) {
            //TODO handle converter error;
        }
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
        let output = [];
        let errors = await appolo_utils_1.Promises.map(constraintSchema, constraintSchema => this._validateConstraint(constraintSchema));
        for (let i = 0; i < errors.length; i++) {
            if (errors[i]) {
                output.push(...errors[i]);
            }
        }
        return output;
    }
    async _validateConstraint(constraintSchema) {
        let constraint = null, error, message;
        try {
            let params = this._createValidationParams(constraintSchema.options, constraintSchema.args);
            params.args = this._prepareArgs(constraintSchema.args, params);
            constraint = this._getInstance(constraintSchema.constraint);
            let result = await constraint.validate(params);
            if (result.isValid) {
                (result.value != undefined) && (this._value = result.value);
                return null;
            }
            if (result.errors && result.errors.length) {
                return result.errors;
            }
            return [this._createError(constraint.defaultMessage(params), constraint.type)];
        }
        catch (e) {
            return [this._createError("failed to run validation", "unknown")];
        }
    }
    _prepareArgs(args, params) {
        let output = [];
        for (let i = 0; i < (args || []).length; i++) {
            let arg = args[i];
            output.push(arg instanceof ref_1.Ref ? arg.geValue(params) : arg);
        }
        return output;
    }
    _createValidationParams(options, args) {
        let params = {
            value: this._value,
            options: options || {},
            args: args || [],
            validator: this.validator,
            property: this._options.property,
            object: this._options.object,
            validateOptions: this._options
        };
        return params;
    }
    _createError(message, type) {
        let error = new ValidationError_1.ValidationError();
        error.value = this._value;
        error.message = message;
        error.type = type;
        error.property = this._options.property;
        error.object = this._options.object;
        return error;
    }
    _getInstance(klass) {
        let classId = appolo_engine_1.Util.getClassName(klass);
        if (this.injector.hasDefinition(classId)) {
            return this.injector.get(classId);
        }
        return new klass();
    }
    getSchemaFromParams(schema) {
        if (schema[registerDecorator_1.SchemaFnSymbol]) {
            return schema[registerDecorator_1.SchemaFnSymbol];
        }
        if (schema instanceof anySchema_1.AnySchema) {
            return schema;
        }
        if (schema instanceof when_1.When) {
            return new anySchema_1.AnySchema().if(schema);
        }
        let meta = Reflect.getMetadata(registerDecorator_1.PropertySymbol, schema.prototype);
        if (!meta) {
            throw new Error("invalid schema");
        }
        let schemaMeta = Reflect.getMetadata(decorators_1.SchemaSymbol, schema.prototype);
        let output = (schemaMeta) ? schemaMeta.schema : index_1.object();
        output.keys(meta);
        return this.getSchemaFromParams(output);
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