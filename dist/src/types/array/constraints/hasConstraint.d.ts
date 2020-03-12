import { AnySchema } from "../../any/anySchema";
import { IConstraint, IConstraintValidateResult, ValidationParams } from "../../../interfaces/IConstraint";
import { IConstraintOptions } from "../../../interfaces/IConstraintOptions";
export declare class ContainsConstraint implements IConstraint {
    validate(params: ValidationParams): Promise<IConstraintValidateResult>;
    get type(): string;
    get defaultMessage(): string;
}
declare module '../arraySchema' {
    interface ArraySchema {
        has(item: AnySchema, options?: IConstraintOptions): this;
    }
}
