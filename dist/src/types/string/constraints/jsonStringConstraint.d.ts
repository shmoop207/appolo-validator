import { IConstraint, IConstraintValidateResult, ValidationParams } from "../../../interfaces/IConstraint";
import { IConstraintOptions } from "../../../interfaces/IConstraintOptions";
export declare class JsonStringConstraint implements IConstraint {
    validate(params: ValidationParams): IConstraintValidateResult;
    get type(): string;
    get defaultMessage(): string;
}
declare module '../stringSchema' {
    interface StringSchema {
        json(options?: IConstraintOptions): this;
    }
}
