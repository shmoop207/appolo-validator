import {IConstraintOptions} from "./IConstraintOptions";

export interface IOptions extends ICommonOptions {
    container?: (klass: (new() => any)) => any
}

export interface ISchemaOptions extends ICommonOptions {

}

export interface IValidateOptions extends ICommonOptions {

    object?: Object;

    property?: string | number;
    validateOnly?: boolean;
    convertOnly?: boolean;
}


interface ICommonOptions {
    convert?: boolean
    groups?: string[]
    stripUnknown?: boolean


}
