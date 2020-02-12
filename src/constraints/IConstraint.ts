import {ValidationError} from "../common/errors/ValidationError";
import {Validator} from "../validator/validator";
import {IConstraintOptions} from "../interfaces/IConstraintOptions";
import {IValidateOptions} from "../interfaces/IOptions";

export interface IConstraintValidateResult {
    isValid: boolean,
    error?: ValidationError
}

export interface IConstraint {
    validate(validationArguments: ValidationParams): Promise<IConstraintValidateResult>

    type: string

    defaultMessage(validationArguments: ValidationParams): string;

}

export interface IConstraintClass {
    new(): IConstraint
}

export interface ValidationParams {

    value: any;


    args: any[];


    targetName?: string;


    object?: Object;

    property?: string | number;

    options: IConstraintOptions
    validateOptions: IValidateOptions

    validator: Validator

}


