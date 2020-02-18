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


    public async validate(value: any, schema: AnySchema, options: IValidateOptions): Promise<{ error: ValidationError, value }> {

        if (options.convert) {
            value = await schema.convert(value);
        }
        this._options = options;
        this._schema = schema;
        this._value = value;
        this._groupsIndex = Arrays.keyBy(options.groups || []);

        let result = await Promises.map(schema.validators, constraintSchema => this._validateConstraint(constraintSchema));

        let {error} = this._buildError(value, result);

        return {error, value};
    }

    private async _validateConstraint(constraintSchema: IConstraintSchema): Promise<{ isValid: boolean, error?: ValidationError }> {
        let constraint: IConstraint = null, error: ValidationError, message: string;

        if (!this._checkValidGroups(constraintSchema.options.groups)) {
            return {isValid: true}
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
                return {isValid: true}
            }

            error = result.error;

        } catch (e) {
            message = "failed to run validator"
        }

        if (!error) {
            error = new ValidationError();
            error.value = this._value;
            error.message = message || constraint.defaultMessage(params);
            error.type = constraint ? constraint.type : "unknown";
            error.property = this._options.property;
            error.target = this._options.object;
        }

        return {isValid: false, error}
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


    private _buildError(value: any, validatorsResults: { isValid: boolean, error?: ValidationError }[]): { error: ValidationError } {

        let isValid: boolean = true, error = new ValidationError();

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

        error.message = "failed to validate";

        return {error}

    }
}
