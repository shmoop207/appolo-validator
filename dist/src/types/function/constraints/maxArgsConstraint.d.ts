import { IConstraint, IConstraintValidateResult, ValidationParams } from "../../../interfaces/IConstraint";
import { IConstraintOptions } from "../../../interfaces/IConstraintOptions";
import { Ref } from "../../../schema/ref";
export declare class MaxArgsConstraint implements IConstraint {
    validate(params: ValidationParams): IConstraintValidateResult;
    get type(): string;
    get defaultMessage(): string;
}
declare module '../functionSchema' {
    interface FunctionSchema {
        maxArgs(limit: number | Ref, options?: IConstraintOptions): this;
    }
}
