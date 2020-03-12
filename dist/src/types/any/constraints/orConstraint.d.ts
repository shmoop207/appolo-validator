import { IConstraint, IConstraintValidateResult, ValidationParams } from "../../../interfaces/IConstraint";
import { IConstraintOptions } from "../../../interfaces/IConstraintOptions";
import { AnySchema } from "../anySchema";
import { Schema } from "../../../schema/registerSchema";
export declare class OrConstraint implements IConstraint {
    validate(params: ValidationParams): Promise<IConstraintValidateResult>;
    private _validateSchema;
    get type(): string;
    get defaultMessage(): string;
}
declare module '../anySchema' {
    interface AnySchema {
        or(schemas: Schema[] | Schema, options?: IConstraintOptions): this;
    }
}
export declare function or(schema: AnySchema | AnySchema[]): AnySchema;
