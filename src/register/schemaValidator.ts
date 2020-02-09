import {IValidationClass, IValidator, ValidationArguments} from "../validators/IValidator";
import {ValidationError} from "../common/errors/ValidationError";
import {inject, Injector, Util, define, singleton} from "appolo-engine";
import {IValidationSchema} from "./schema";
import {IValidateOptions} from "../interfaces/IOptions";
import {Objects, Promises} from "appolo-utils/index";
import {ValidateDefaults} from "../defaults/defaults";

@define()
@singleton()
export class SchemaValidator {

    @inject() private injector: Injector;


    public async validate(value: any, validators: IValidationSchema[], options: IValidateOptions): Promise<{ error: ValidationError }> {

        let result = await Promises.map(validators, validator => this._validateValidator(value, validator));

        let {error} = this._buildError(value, result);

        return {error};
    }

    private async _validateValidator(value: any, validationSchema: IValidationSchema): Promise<{ validator: IValidator, isValid: boolean, message: string }> {
        let validator: IValidator = null, isValid = false, message: string;

        try {

            validator = this._getValidatorInstance(validationSchema.validationClass);

            let params: ValidationArguments = {
                value,
                options: validationSchema.options || {},
                constraints: validationSchema.constraints || []
            };

            isValid = await validator.validate(params);

            if (!isValid) {
                message = validator.defaultMessage(params);
            }

        } catch (e) {
            message = "failed to run validator"
        }

        return {validator, isValid, message}
    }

    private _getValidatorInstance(validationClass: IValidationClass): IValidator {
        let classId = Util.getClassName(validationClass);

        if (this.injector.hasDefinition(classId)) {
            return this.injector.get(classId);
        }

        return new validationClass();
    }


    private _buildError(value: any, validatorsResults: { validator: IValidator, isValid: boolean, message: string }[]): { error: ValidationError } {

        //TODO refactor create error
        let error = new ValidationError({value}), isValid = true;

        for (let i = 0; i < validatorsResults.length; i++) {
            let validatorResult = validatorsResults[i];

            if (!validatorResult.isValid) {
                isValid = false;
                error.constraints[validatorResult.validator ? validatorResult.validator.name : "unknown"] = validatorResult.message

            }
        }

        return {error: isValid ? null : error}

    }
}
