import { IConstraint, IConstraintValidateResult, ValidationParams } from "../../../interfaces/IConstraint";
import { IConstraintOptions } from "../../../interfaces/IConstraintOptions";
export declare class IsClassConstraint implements IConstraint {
    validate(args: ValidationParams): IConstraintValidateResult;
    get type(): string;
    get defaultMessage(): string;
}
declare module '../functionSchema' {
    interface FunctionSchema {
        isClass(options?: IConstraintOptions): this;
    }
}
