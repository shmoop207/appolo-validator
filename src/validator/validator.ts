import {define, singleton, inject, injectFactoryMethod} from "appolo-engine"
import {IOptions, ISchemaOptions, IValidateOptions} from "../interfaces/IOptions";
import {Arrays, Objects} from "appolo-utils/index";
import {SchemaDefaults, ValidateDefaults, ValidatorDefaults} from "../defaults/defaults";
import {ValidationError} from "../common/errors/ValidationError";
import {SchemaValidator} from "../schema/schemaValidator";
import {any, AnySchema} from "../schema/types/anySchema";
import {When} from "../constraints/when/when";

@define()
@singleton()
export class Validator {
    @inject() private options: IOptions;
    @injectFactoryMethod(SchemaValidator) private createSchemaValidator: () => SchemaValidator;

    // public schema(options: ISchemaOptions = {}) {
    //
    //     options = Objects.defaults({}, options, this.options, ValidatorDefaults);
    //
    //     return new Schema(options);
    // }

    public async validate(schema: AnySchema|When, value: any, options: IValidateOptions = {}): Promise<{ errors: ValidationError[], value: any }> {

        if(schema instanceof When){
            schema = any().if(schema);
        }

        options = Objects.defaults({}, options, schema.getOptions(), this.options, ValidateDefaults);

        let result = await this.createSchemaValidator().validate(value, schema, options);

        return result;
    }

    public async validateAndTrow(schema: AnySchema, value: any, options: IValidateOptions) {
        throw new Error("not implemented")
    }
}


