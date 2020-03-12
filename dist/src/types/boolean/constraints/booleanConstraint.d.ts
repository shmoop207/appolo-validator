import { IConstraint, IConstraintValidateResult, ValidationParams } from "../../../interfaces/IConstraint";
import { IConstraintOptions } from "../../../interfaces/IConstraintOptions";
export declare class BooleanConstraint implements IConstraint {
    validate(args: ValidationParams): IConstraintValidateResult;
    get type(): string;
    get defaultMessage(): string;
}
declare module '../booleanSchema' {
    interface BooleanSchema {
        isBoolean(options?: IConstraintOptions): this;
    }
}
