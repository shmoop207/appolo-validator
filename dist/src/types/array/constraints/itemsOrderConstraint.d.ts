import { IConstraint, IConstraintValidateResult, ValidationParams } from "../../../interfaces/IConstraint";
import { IConstraintOptions } from "../../../interfaces/IConstraintOptions";
import { Schema } from "../../../schema/registerSchema";
export declare class ItemsOrderConstraint implements IConstraint {
    validate(params: ValidationParams): Promise<IConstraintValidateResult>;
    get type(): string;
    get defaultMessage(): string;
}
declare module '../arraySchema' {
    interface ArraySchema {
        order(schemas: Schema[], options?: IConstraintOptions): this;
    }
}
