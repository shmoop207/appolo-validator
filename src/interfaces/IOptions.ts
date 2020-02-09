export interface IOptions extends IValidateOptions, ISchemaOptions {

}

export interface ISchemaOptions extends IValidateOptions {

}

export interface IValidateOptions {
    whitelist?: boolean
}
