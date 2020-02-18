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

    public async validate(schema: AnySchema, value: any, options: IValidateOptions = {}): Promise<{ error: ValidationError, value: any }> {

        options = Objects.defaults({}, options, schema.options, ValidateDefaults);


        let result = await this.createSchemaValidator().validate(value, schema, options);

        return {error: result.error, value: result.value};
    }

    public async validateAndTrow(schema: Schema, value: any, options: IValidateOptions) {
        let result = await this.validate(value, options);

        if (result.error) {
            throw result.error;
        }

        return result.value;
    }
}


