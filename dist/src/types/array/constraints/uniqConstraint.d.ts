import { IConstraint, IConstraintValidateResult, ValidationParams } from "../../../interfaces/IConstraint";
import { IConstraintOptions } from "../../../interfaces/IConstraintOptions";
export declare class UniqConstraint implements IConstraint {
    validate(params: ValidationParams): IConstraintValidateResult;
    get type(): string;
    get defaultMessage(): string;
}
declare module '../arraySchema' {
    interface ArraySchema {
        uniq(fn?: ((item: any, index?: number) => any), options?: IConstraintOptions): this;
    }
}
