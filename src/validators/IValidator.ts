import {IValidationOptions} from "../register/validatorOptions";

export interface IValidator {
    validate(validationArguments: ValidationArguments): Promise<boolean>

    name: string

    defaultMessage(validationArguments: ValidationArguments): string;

}

export interface IValidationClass {
    new(): IValidator
}

export interface ValidationArguments {

    value: any;


    constraints: any[];


    targetName?: string;


    object?: Object;

    property?: string;

    options: IValidationOptions

}
