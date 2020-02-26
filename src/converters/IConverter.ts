import {ValidationParams} from "../constraints/IConstraint";

export interface IConverter {
    convert(validationArguments: ValidationParams): Promise<any> | any
}

export interface IConverterClass{
    new(): IConverter
}
