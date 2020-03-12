import { IConstraint, IConstraintValidateResult, ValidationParams } from "../../../interfaces/IConstraint";
import { IConstraintOptions } from "../../../interfaces/IConstraintOptions";
import { AnySchema } from "../anySchema";
export declare class AndConstraint implements IConstraint {
    validate(params: ValidationParams): Promise<IConstraintValidateResult>;
    private _validateSchema;
    get type(): string;
    get defaultMessage(): string;
}
declare module '../anySchema' {
    interface AnySchema {
        and(schemas: AnySchema[] | AnySchema, options?: IConstraintOptions): this;
    }
}
export declare function and(schema: AnySchema | AnySchema[]): AnySchema;
