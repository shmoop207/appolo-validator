import {
    IConstraintClass,
    IConstraint,
    ValidationParams,
    IConstraintValidateResult
} from "../constraints/IConstraint";
import {ValidationError} from "../common/errors/ValidationError";
import {inject, Injector, Util, define, singleton} from "appolo-engine";
import {Schema} from "./schema";
import {IValidateOptions} from "../interfaces/IOptions";
import {Objects, Promises, Arrays} from "appolo-utils";
import {ValidateDefaults} from "../defaults/defaults";
import {Validator} from "../validator/validator";
import {IConstraintSchema} from "../interfaces/IConstraintSchema";
import {AnySchema} from "./types/anySchema";

@define()
export class SchemaValidator {

    @inject() private injector: Injector;
    @inject() private validator: Validator;

    private _groupsIndex: { [index: string]: string };
    private _options: IValidateOptions;
    private _schema: AnySchema;
    private _value: any;


    public async validate(value: any, schema: AnySchema, options: IValidateOptions): Promise<{ errors: ValidationError[], value: any }> {

        if (options.convert) {
            value = await schema.convert(value);
        }
        this._options = options;
        this._schema = schema;
        this._value = value;
        this._groupsIndex = Arrays.keyBy(options.groups || []);

        let {blackList, parallel, whiteList} = this._distributeConstraint(schema.constraints);

        if (await this._checkWhiteListConstraint(whiteList)) {
            return {errors: [], value}
        }

        let blackListError = await this._checkBlackListConstraint(blackList);

        if (blackListError) {
            return {errors: [blackListError], value};
        }

        let errors = await this._checkParallelConstraint(parallel);

        return {errors, value};
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

    private async _validateConstraint(constraintSchema: IConstraintSchema): Promise<ValidationError> {
        let constraint: IConstraint = null, error: ValidationError, message: string;

        if (!this._checkValidGroups(constraintSchema.options.groups)) {
            return null
        }

        let params: ValidationParams = {
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
                return null
            }

            error = result.error || this._createError(constraint.defaultMessage(params), constraint.type);

        } catch (e) {
            error = this._createError("failed to run validator", "unknown");
        }

        return error
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

    private _checkValidGroups(constraintGroups: string[]): boolean {
        if (!this._options.groups || !this._options.groups.length || !constraintGroups || !constraintGroups.length) {
            return true;
        }
        let validGroups = constraintGroups.every(group => !!this._groupsIndex[group]);

        return validGroups;
    }

    private _getConstraintInstance(constraintClass: IConstraintClass): IConstraint {
        let classId = Util.getClassName(constraintClass);

        if (this.injector.hasDefinition(classId)) {
            return this.injector.get(classId);
        }

        return new constraintClass();
    }


    private _buildError(validatorsResults: { isValid: boolean, error?: ValidationError }[]): { error: ValidationError } {

        let isValid: boolean = true, error = this._createError("failed to validate", "");

        for (let i = 0; i < validatorsResults.length; i++) {
            let validatorResult = validatorsResults[i];

            if (!validatorResult.isValid) {
                isValid = false;
                error.constraints.push(validatorResult.error)
            }
        }

        if (isValid) {
            return {error: null};
        }

        return {error}

    }
}
