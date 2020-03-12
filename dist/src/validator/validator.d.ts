import { IClass } from "appolo-engine";
import { IValidateOptions } from "../interfaces/IOptions";
import { ValidationError } from "../common/errors/ValidationError";
import { AnySchema } from "../types/any/anySchema";
import { When } from "../when/when";
import { Schema } from "../schema/registerSchema";
export declare class Validator {
    private options;
    private createSchemaValidator;
    validate(schema: Schema | When | IClass, value: any, options?: IValidateOptions): Promise<{
        errors: ValidationError[];
        value: any;
    }>;
    getSchema(schema: AnySchema | Schema | When | IClass): AnySchema;
    validateAndTrow(schema: AnySchema, value: any, options: IValidateOptions): Promise<any>;
}
