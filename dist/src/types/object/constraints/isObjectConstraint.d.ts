import { IConstraint, IConstraintValidateResult, ValidationParams } from "../../../interfaces/IConstraint";
import { IConstraintOptions } from "../../../interfaces/IConstraintOptions";
export declare class IsObjectConstraint implements IConstraint {
    validate(params: ValidationParams): IConstraintValidateResult;
    get type(): string;
    get defaultMessage(): string;
}
declare module '../objectSchema' {
    interface ObjectSchema {
        isObject(options?: IConstraintOptions): this;
    }
}
