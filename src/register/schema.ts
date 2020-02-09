import {IValidationClass, IValidator, ValidationArguments} from "../validators/IValidator";
import {IValidationOptions} from "./validatorOptions";
import {Promises, Objects} from "appolo-utils";
import {define, inject, Injector, Util} from "appolo-engine";
import {IOptions, ISchemaOptions, IValidateOptions} from "../interfaces/IOptions";
import {SchemaDefaults, ValidateDefaults, ValidatorDefaults} from "../defaults/defaults";
import {ValidationError} from "../common/errors/ValidationError";
import {SchemaValidator} from "./schemaValidator";

export interface IValidationSchema {
    validationClass: IValidationClass
    options?: IValidationOptions
    constraints?: any[]
}

@define()
export class Schema {

    private readonly _schemaOptions: ISchemaOptions;

    @inject() private schemaValidator: SchemaValidator;

    private _validators: IValidationSchema[] = [];

    constructor(options: ISchemaOptions) {
        this._schemaOptions = options;
    }

    public addValidation(schema: IValidationSchema): Schema {
        this._validators.push(schema);
        return this
    }

    public type(type: typeof String | Boolean | Number | Object | Array<any> | string) {

    }

    public async validate(value: any, options: IValidateOptions = {}): Promise<{ error: ValidationError, value: any }> {

        options = Objects.defaults({}, options, this._schemaOptions, ValidateDefaults);

        let {error} = await this.schemaValidator.validate(value, this._validators, options);

        return {error, value};
    }

    public async validateAndTrow(value: any, options: IValidateOptions) {
        let {error, value: resultValue} = await this.validate(value, options);

        if (error) {
            throw error;
        }

        return resultValue;
    }


}

