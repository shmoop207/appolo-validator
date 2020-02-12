export interface IOptions extends ICommonOptions {

}

export interface ISchemaOptions extends ICommonOptions {

}

export interface IValidateOptions extends ICommonOptions {

    object?: Object;

    property?: string | number;
}

interface ICommonOptions {
    convert?: boolean
    groups?: string[]
}
