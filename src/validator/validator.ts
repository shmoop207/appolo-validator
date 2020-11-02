import {define, singleton, inject, factoryMethod} from "@appolo/inject"
import {IOptions, ISchemaOptions, IValidateOptions} from "../interfaces/IOptions";
import {Arrays, Objects} from "@appolo/utils";
import {IClass} from "@appolo/engine";
import {SchemaDefaults, ValidateDefaults, ValidatorDefaults} from "../defaults/defaults";
import {ValidationError} from "../common/errors/ValidationError";
import {SchemaValidator} from "../schema/schemaValidator";
import {any, AnySchema, SchemaWrapper} from "../types/any/anySchema";
import {When} from "../when/when";
import {object} from "../../index";
import {ValidationErrorsError} from "../common/errors/ValidationErrorsError";

@define()
@singleton()
export class Validator {
    @inject() private options: IOptions;
    @factoryMethod(SchemaValidator) private createSchemaValidator: () => SchemaValidator;


    public validate(schema: AnySchema | When | IClass, value: any, options: IValidateOptions = {}): Promise<{ errors: ValidationError[], value: any }> {

        let validator = this.createSchemaValidator();

        let schem = SchemaValidator.getSchemaFromParams(schema);

        if (!schem) {
            throw new Error("failed to find schema")
        }

        options = Objects.defaults({}, options, schem.getOptions(), this.options, ValidateDefaults);

        return validator.validate(value, schem, options);

    }

    public getSchema(schema: AnySchema | AnySchema | When | IClass): AnySchema & SchemaWrapper {
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


