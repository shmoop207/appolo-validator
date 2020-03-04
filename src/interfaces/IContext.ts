import {ValidationParams} from "./IConstraint";
import {IConverterClass} from "./IConverter";
import {IConverterOptions} from "./IConverterOptions";

export interface IContext {
    addContext(validationArguments: ValidationParams): Promise<any> | any
}

export interface IContextClass {
    new(): IContext
}


export interface IContextSchema {
    context: IContextClass
    args?: any[]
}
