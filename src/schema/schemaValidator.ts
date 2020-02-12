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
import {Objects, Promises} from "appolo-utils/index";
import {ValidateDefaults} from "../defaults/defaults";
import {Validator} from "../validator/validator";
import {IConstraintSchema} from "../interfaces/IConstraintSchema";
import {AnySchema} from "./types/anySchema";

@define()
@singleton()
export class SchemaValidator {

    @inject() private injector: Injector;
    @inject() private validator: Validator;


    public async validate(value: any, schema: AnySchema, options: IValidateOptions): Promise<{ error: ValidationError,value }> {

        if (options.convert) {
            value = await schema.convert(value);
        }

        let result = await Promises.map(schema.validators, validator => this._validateValidator(value, validator, options));

        let {error} = this._buildError(value, result);

        return {error,value};
    }

    private async _validateValidator(value: any, constraintSchema: IConstraintSchema, options: IValidateOptions): Promise<{ isValid: boolean, error?: ValidationError }> {
        let constraint: IConstraint = null, error: ValidationError, message: string;

        let params: ValidationParams = {
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
                return {isValid: true}
            }

            error = result.error;

        } catch (e) {
            message = "failed to run validator"
        }

        if (!error) {
            error = new ValidationError();
            error.value = value;
            error.message = message || constraint.defaultMessage(params);
            error.type = constraint ? constraint.type : "unknown";
            error.property = options.property;
            error.target = options.object;
        }

        return {isValid: false, error}
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
