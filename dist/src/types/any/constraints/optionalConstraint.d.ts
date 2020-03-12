import { IConstraint, IConstraintValidateResult, ValidationParams } from "../../../interfaces/IConstraint";
import { IConstraintOptions } from "../../../interfaces/IConstraintOptions";
export declare class OptionalConstraint implements IConstraint {
    validate(params: ValidationParams): IConstraintValidateResult;
    get type(): string;
    get defaultMessage(): string;
}
declare module '../anySchema' {
    interface AnySchema {
        optional(options?: IConstraintOptions): this;
    }
}
