import {define, singleton, inject, injectFactoryMethod, IClass} from "appolo-engine"
import {IOptions, ISchemaOptions, IValidateOptions} from "../interfaces/IOptions";
import {Arrays, Objects} from "appolo-utils/index";
import {SchemaDefaults, ValidateDefaults, ValidatorDefaults} from "../defaults/defaults";
import {ValidationError} from "../common/errors/ValidationError";
import {SchemaValidator} from "../schema/schemaValidator";
import {any, AnySchema} from "../types/any/anySchema";
import {When} from "../when/when";
import {Classes} from "appolo-utils";
import {object} from "../../index";
import {ValidationErrorsError} from "../common/errors/ValidationErrorsError";
import {Schema} from "../schema/registerSchema";

@define()
@singleton()
export class Validator {
    @inject() private options: IOptions;
    @injectFactoryMethod(SchemaValidator) private createSchemaValidator: () => SchemaValidator;


    public validate(schema: Schema | When | IClass, value: any, options: IValidateOptions = {}): Promise<{ errors: ValidationError[], value: any }> {

        let validator = this.createSchemaValidator();

        let schem = SchemaValidator.getSchemaFromParams(schema);

        if (!schem) {
            throw new Error("failed to find schema")
        }

        options = Objects.defaults({}, options, schem.getOptions(), this.options, ValidateDefaults);

        return validator.validate(value, schem, options);

    }

    public getSchema(schema: AnySchema | Schema | When | IClass): AnySchema {
        return SchemaValidator.getSchemaFromParams(schema)
    }

    public async validateAndTrow(schema: AnySchema, value: any, options: IValidateOptions) {
        let results = await this.validate(schema, value, options);

        if (results.errors.length == 0) {
            return results.value;
        }

        throw new ValidationErrorsError(results.errors)
    }
}


