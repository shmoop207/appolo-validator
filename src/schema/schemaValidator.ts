import {
    IConstraintClass,
    IConstraint,
    ValidationParams,
    IConstraintValidateResult, IConverterClass
} from "../constraints/IConstraint";
import {ValidationError} from "../common/errors/ValidationError";
import {inject, Injector, Util, define, singleton} from "appolo-engine";
import {IValidateOptions} from "../interfaces/IOptions";
import {Objects, Promises, Arrays} from "appolo-utils";
import {ValidateDefaults} from "../defaults/defaults";
import {Validator} from "../validator/validator";
import {IConstraintSchema} from "../interfaces/IConstraintSchema";
import {AnySchema} from "./types/anySchema";
import {IConverter} from "../converters/IConverter";
import {IConverterSchema} from "../interfaces/IConverterSchema";
import {IConstraintOptions} from "../interfaces/IConstraintOptions";
import {Ref} from "./types/ref";

@define()
export class SchemaValidator {

    @inject() private injector: Injector;
    @inject() private validator: Validator;

    private _groupsIndex: { [index: string]: string };
    private _options: IValidateOptions;
    private _schema: AnySchema;
    private _value: any;


    public async validate(value: any, schema: AnySchema, options: IValidateOptions): Promise<{ errors: ValidationError[], value: any }> {

        this._options = options;
        this._schema = schema;
        this._value = value;
        this._groupsIndex = Arrays.keyBy(options.groups || []);

        schema.beforeValidate(options);

        if (schema.converters.length) {
            await this._runConverters();
        }

        let {blackList, parallel, whiteList} = this._distributeConstraint(schema.constraints);

        if (whiteList.length && await this._checkWhiteListConstraint(whiteList)) {
            return {errors: [], value}
        }

        if (blackList.length) {
            let blackListError = await this._checkBlackListConstraint(blackList);

            if (blackListError) {
                return {errors: [blackListError], value};
            }
        }

        let errors = await this._checkParallelConstraint(parallel);

        return {errors, value: this._value};
    }

    private async _checkWhiteListConstraint(whiteList: IConstraintSchema[]): Promise<boolean> {
        if (whiteList.length == 0) {
            return false;
        }

        let result = await Promises.someResolved(whiteList.map(item => this._validateConstraint(item)), {fn: value => !value});

        return result.length > 0
    }

    private async _checkBlackListConstraint(blackList: IConstraintSchema[]): Promise<ValidationError> {
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

        let errors = await Promises.map(constraintSchema, constraintSchema => this._validateConstraint(constraintSchema));

        return Arrays.compact(errors);

    }

    private async _runConverters() {
        for (let i = 0; i < this._schema.converters.length; i++) {
            let converter = this._schema.converters[i];

            await this._convertValue(converter);
        }
    }

    private async _convertValue(converterSchema: IConverterSchema) {
        try {
            let converter = this._getInstance(converterSchema.converter);

            let params = this._createValidationParams(converterSchema.options, converterSchema.args);

            let value = await converter.convert(params);

            this._value = value;

        } catch (e) {
            //TODO handle converter error;
        }
    }

    private async _validateConstraint(constraintSchema: IConstraintSchema): Promise<ValidationError> {
        let constraint: IConstraint = null, error: ValidationError, message: string;

        // if (!this._checkValidGroups(constraintSchema.options.groups)) {
        //     return null
        // }

        try {


            let params = this._createValidationParams(constraintSchema.options, constraintSchema.args);

            params.args = this._prepareArgs(constraintSchema.args, params);

            constraint = this._getInstance(constraintSchema.constraint);

            let result = await constraint.validate(params);

            if (result.isValid) {

                (result.value != undefined) && (this._value = result.value);

                return null
            }

            error = result.error || this._createError(constraint.defaultMessage(params), constraint.type);

        } catch (e) {
            error = this._createError("failed to run validation", "unknown");
        }

        return error
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
            validateOptions: this._options
        };

        return params;
    }

    private _createError(message: string, type: string) {
        let error = new ValidationError();
        error.value = this._value;
        error.message = message;
        error.type = type;
        error.property = this._options.property;
        error.target = this._options.object;

        return error;
    }

    // private _checkValidGroups(constraintGroups: string[]): boolean {
    //     if (!this._options.groups || !this._options.groups.length || !constraintGroups || !constraintGroups.length) {
    //         return true;
    //     }
    //     let validGroups = constraintGroups.every(group => !!this._groupsIndex[group]);
    //
    //     return validGroups;
    // }

    private _getInstance<T>(klass: (new() => T)): T {
        let classId = Util.getClassName(klass);

        if (this.injector.hasDefinition(classId)) {
            return this.injector.get(classId);
        }

        return new klass();
    }


    // private _buildError(validatorsResults: { isValid: boolean, error?: ValidationError }[]): { error: ValidationError } {
    //
    //     let isValid: boolean = true, error = this._createError("failed to validate", "");
    //
    //     for (let i = 0; i < validatorsResults.length; i++) {
    //         let validatorResult = validatorsResults[i];
    //
    //         if (!validatorResult.isValid) {
    //             isValid = false;
    //             error.constraints.push(validatorResult.error)
    //         }
    //     }
    //
    //     if (isValid) {
    //         return {error: null};
    //     }
    //
    //     return {error}
    //
    // }
}
