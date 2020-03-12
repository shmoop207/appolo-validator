import { IConstraint, IConstraintValidateResult, ValidationParams } from "../../../interfaces/IConstraint";
import { IConstraintOptions } from "../../../interfaces/IConstraintOptions";
export declare class LowerCaseStringConstraint implements IConstraint {
    validate(args: ValidationParams): IConstraintValidateResult;
    get type(): string;
    get defaultMessage(): string;
}
declare module '../stringSchema' {
    interface StringSchema {
        lowercase(options?: IConstraintOptions): this;
    }
}
