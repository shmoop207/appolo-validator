import { IConstraint, IConstraintValidateResult, ValidationParams } from "../../../interfaces/IConstraint";
import { IConstraintOptions } from "../../../interfaces/IConstraintOptions";
import { Ref } from "../../../schema/ref";
export declare class ArgsSizeConstraint implements IConstraint {
    validate(params: ValidationParams): IConstraintValidateResult;
    get type(): string;
    get defaultMessage(): string;
}
declare module '../functionSchema' {
    interface FunctionSchema {
        argsSize(limit: number | Ref, options?: IConstraintOptions): this;
    }
}
