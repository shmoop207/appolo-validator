import {
    IConstraintClass,
    IConstraint,
    ValidationParams,
    IConstraintValidateResult
} from "../interfaces/IConstraint";
import {ValidationError} from "../common/errors/ValidationError";
import {inject, Injector, Util, define, singleton} from "appolo-engine";
import {IOptions, IValidateOptions} from "../interfaces/IOptions";
import {Objects, Promises, Arrays} from "appolo-utils";
import {ValidateDefaults} from "../defaults/defaults";
import {Validator} from "../validator/validator";
import {IConstraintSchema} from "../interfaces/IConstraintSchema";
import {any, SchemaWrapper} from "../types/any/anySchema";
import {IConverterSchema} from "../interfaces/IConverterSchema";
import {IConstraintOptions} from "../interfaces/IConstraintOptions";
import {Ref} from "./ref";
import {SchemaFnWhen, When} from "../when/when";
import {IClass} from "appolo-engine/index";
import {PropertySymbol, RegisterDecorator, SchemaFnSymbol} from "../decorators/registerDecorator";
import {object} from "../../index";
import {SchemaSymbol} from "../decorators/decorators";
import {ObjectSchema} from "../types/object/objectSchema";
import {AnySchema} from "../../index";

@define()
export class SchemaValidator {

    @inject() private injector: Injector;
    @inject() private validator: Validator;

    private _groupsIndex: { [index: string]: string };
    private _options: IValidateOptions;
    private _schema: AnySchema;
    private _value: any;


    public async validate(value: any, schema: AnySchema & SchemaWrapper, options: IValidateOptions): Promise<{ errors: ValidationError[], value: any }> {

        this._options = options;
        this._schema = schema;
        this._value = value;
        this._groupsIndex = options.groups ? Arrays.keyBy(options.groups || []) : {};

        if (options.convertOnly || !options.validateOnly) {
            await this._handleConverters(schema, options);
        }

        if (options.convertOnly) {
            return {errors: [], value: this._value}
        }


        let {blackList, parallel, whiteList} = this._distributeConstraint(schema.constraints);

        if (whiteList.length && await this._checkWhiteListConstraint(whiteList)) {
            return {errors: [], value}
        }

        if (blackList.length) {
            let blackListError = await this._checkBlackListConstraint(blackList);

            if (blackListError) {
                return {errors: blackListError, value};
            }
        }

        let errors = await this._checkParallelConstraint(parallel);

        return {errors, value: this._value};
    }

    private _handleConverters(schema: AnySchema & SchemaWrapper, options: IValidateOptions) {
        let converters: IConverterSchema[] = (schema.converters || []);

        // if (options.convert && schema.converter) {
        //     contexts = contexts.slice();
        //     contexts.unshift({converter: schema.converter, args: []})
        // }

        if (converters.length) {
            return this._runConverters(converters);
        }
    }

    private async _runConverters(converters: IConverterSchema[]) {
        for (let i = 0; i < converters.length; i++) {
            let converter = converters[i];

            await this._convertValue(converter);
        }
    }

    private async _convertValue(converterSchema: IConverterSchema) {
        try {

            let params = this._createValidationParams(converterSchema.options, converterSchema.args);

            if (converterSchema.options && converterSchema.options.runIf && !converterSchema.options.runIf(params)) {
                return;
            }

            let converter = this._getInstance(converterSchema.converter, converterSchema.inject);

            let value = converter.convert(params);

            if (value instanceof Promise) {
                value = await value
            }

            this._value = value;

        } catch (e) {
            //TODO handle converter error;
        }
    }

    private async _checkWhiteListConstraint(whiteList: IConstraintSchema[]): Promise<boolean> {
        if (whiteList.length == 0) {
            return false;
        }

        let result = await Promises.someResolved(whiteList.map(item => this._validateConstraint(item)), {fn: value => !value});

        return result.length > 0
    }

    private async _checkBlackListConstraint(blackList: IConstraintSchema[]): Promise<ValidationError[]> {
        if (blackList.length == 0) {
            return null;
        }

        let result = await Promises.someRejected(blackList.map(item => this._validateConstraint(item)), {fn: value => !value});

        if (!result.length) {
            return null
        }

        return result[0].reason
    }

    private _distributeConstraint(validators: IConstraintSchema[]) {
        let blackList: IConstraintSchema[] = [], whiteList: IConstraintSchema[] = [],
            parallel: IConstraintSchema[] = [];

        for (let i = 0; i < validators.length; i++) {
            let validator = validators[i];
            validator.blackList
                ? blackList.push(validator)
                : validator.whiteList ? whiteList.push(validator) : parallel.push(validator)
        }

        return {blackList, whiteList, parallel};
    }

    private async _checkParallelConstraint(constraintSchema: IConstraintSchema[]): Promise<ValidationError[]> {
        let output = [];
        let errors = await Promise.all(constraintSchema.map(constraintSchema => this._validateConstraint(constraintSchema)));

        for (let i = 0; i < errors.length; i++) {
            if (errors[i]) {
                output.push(...errors[i])
            }
        }

        return output
    }

    private async _validateConstraint(constraintSchema: IConstraintSchema): Promise<ValidationError[]> {
        let constraint: IConstraint = null;
        let params = this._createValidationParams(constraintSchema.options, constraintSchema.args);
        try {

            if (constraintSchema.options && constraintSchema.options.runIf && !constraintSchema.options.runIf(params)) {
                return null;
            }

            if (constraintSchema.options && constraintSchema.options.groups && !constraintSchema.options.groups.every(group => this._options.groups.indexOf(group) > -1)) {
                return null;
            }

            params.args = this._prepareArgs(constraintSchema.args, params);

            constraint = this._getInstance(constraintSchema.constraint, constraintSchema.inject);

            let result = constraint.validate(params);

            if (result instanceof Promise) {
                result = await result;
            }

            if (result.isValid) {

                (result.value != undefined) && (this._value = result.value);

                return null
            }

            if (result.errors && result.errors.length) {
                return result.errors;
            }
            let message = params.options.message || constraint.defaultMessage;
            return [this._createError(params, message, constraint.type)];

        } catch (e) {
            return [this._createError(params, "failed to run validation", "unknown")];
        }

    }


    private _prepareArgs(args: any[], params: ValidationParams): any[] {
        let output = [];

        for (let i = 0; i < (args || []).length; i++) {
            let arg = args[i];
            output.push(arg instanceof Ref ? arg.geValue(params) : arg)
        }

        return output;
    }

    private _createValidationParams(options: IConstraintOptions, args: any[]): ValidationParams {
        let params: ValidationParams = {
            value: this._value,
            options: options || {},
            args: args || [],
            validator: this.validator,
            property: this._options.property,
            object: this._options.object,
            validateOptions: this._options,
            schema: this._schema
        };

        return params;
    }

    private _createError(params: ValidationParams, message: string, type: string) {
        let error = new ValidationError();
        error.value = params.value;
        error.message = message;
        error.type = type;
        error.property = this._options.property;
        error.object = this._options.object;
        error.args = params.args;

        return error;
    }


    private _getInstance<T>(klass: (new() => T), inject: boolean): T {


        if (inject && (this._options as IOptions).container) {
            let instance = (this._options as IOptions).container(klass);
            if (instance) {
                return instance;
            }
        }

        return new klass();

    }

    public static getSchemaFromParams(schema: AnySchema | AnySchema | When | IClass): AnySchema & SchemaWrapper {

        if (schema[SchemaFnSymbol] || schema[SchemaFnWhen]) {
            schema = schema[SchemaFnSymbol] || schema[SchemaFnWhen]
        }

        if (schema instanceof AnySchema) {
            return schema as any;
        }

        if (schema instanceof When) {
            return new AnySchema().if(schema) as any
        }

        let meta = Reflect.getMetadata(PropertySymbol, (schema as Function).prototype);

        if (!meta) {
            return null
        }

        let schemaMeta: { schema: ObjectSchema } = Reflect.getMetadata(SchemaSymbol, (schema as Function).prototype);

        let output = (schemaMeta) ? schemaMeta.schema : object();

        output.keys(meta);

        return this.getSchemaFromParams(output)
    }

}
