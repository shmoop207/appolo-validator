import { ValidationParams } from "./IConstraint";
export interface IConverter {
    convert(validationArguments: ValidationParams): Promise<any> | any;
}
export interface IConverterClass {
    new (): IConverter;
}
