import { ValidationError } from "../common/errors/ValidationError";
import { IValidateOptions } from "../interfaces/IOptions";
import { AnySchema } from "../types/any/anySchema";
import { When } from "../when/when";
import { IClass } from "appolo-engine/index";
import { Schema } from "./registerSchema";
export declare class SchemaValidator {
    private injector;
    private validator;
    private _groupsIndex;
    private _options;
    private _schema;
    private _value;
    validate(value: any, schema: AnySchema, options: IValidateOptions): Promise<{
        errors: ValidationError[];
        value: any;
    }>;
    private _handleConverters;
    private _runConverters;
    private _convertValue;
    private _checkWhiteListConstraint;
    private _checkBlackListConstraint;
    private _distributeConstraint;
    private _checkParallelConstraint;
    private _validateConstraint;
    private _prepareArgs;
    private _createValidationParams;
    private _createError;
    private _getInstance;
    static getSchemaFromParams(schema: AnySchema | Schema | When | IClass): AnySchema;
}
