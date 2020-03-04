import {ValidationError} from "../common/errors/ValidationError";
import {Validator} from "../validator/validator";
import {IConstraintOptions} from "./IConstraintOptions";
import {IValidateOptions} from "./IOptions";
import {IConverter} from "./IConverter";
import {AnySchema} from "../types/any/anySchema";

export interface IConstraintValidateResult {
    isValid: boolean,
    errors?: ValidationError[],
    value?: any
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


    object?: any;

    property?: string | number;

    options: IConstraintOptions
    validateOptions: IValidateOptions

    validator: Validator
    schema: AnySchema

}


