import {define, singleton, inject, injectFactoryMethod} from "appolo-engine"
import {IOptions, ISchemaOptions, IValidateOptions} from "../interfaces/IOptions";
import {Schema} from "../schema/schema";
import {Arrays, Objects} from "appolo-utils/index";
import {SchemaDefaults, ValidateDefaults, ValidatorDefaults} from "../defaults/defaults";
import {ValidationError} from "../common/errors/ValidationError";
import {SchemaValidator} from "../schema/schemaValidator";
import {AnySchema} from "../schema/types/anySchema";

@define()
@singleton()
export class Validator {
    @inject() private options: IOptions;
    @injectFactoryMethod(SchemaValidator) private createSchemaValidator: () => SchemaValidator;

    public schema(options: ISchemaOptions = {}) {

        options = Objects.defaults({}, options, this.options, ValidatorDefaults);

        return new Schema(options);
    }

    public async validate(schema: AnySchema, value: any, options: IValidateOptions = {}): Promise<{ errors: ValidationError[], value: any }> {

        options = Objects.defaults({}, options, schema.options, ValidateDefaults);


        let {errors, value: valueConverted} = await this.createSchemaValidator().validate(value, schema, options);

        return {errors, value: valueConverted};
    }

    public async validateAndTrow(schema: Schema, value: any, options: IValidateOptions) {
       throw new Error("not implemented")
    }
}


