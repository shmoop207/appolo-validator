import { IConstraint, IConstraintValidateResult, ValidationParams } from "../../../interfaces/IConstraint";
import { IConstraintOptions } from "../../../interfaces/IConstraintOptions";
export declare class NumberConstraint implements IConstraint {
    validate(args: ValidationParams): Promise<IConstraintValidateResult>;
    get type(): string;
    get defaultMessage(): string;
}
declare module '../numberSchema' {
    interface NumberSchema {
        float(options?: IConstraintOptions): this;
    }
}
