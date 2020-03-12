import { IConstraint, IConstraintValidateResult, ValidationParams } from "../interfaces/IConstraint";
import { When } from "./when";
export declare class WhenConstraint implements IConstraint {
    validate(params: ValidationParams): Promise<IConstraintValidateResult>;
    private _getMatchedValue;
    private _findMatchedCase;
    private _matchCase;
    private _validateSchemaResult;
    private _validateSchema;
    get type(): string;
    get defaultMessage(): string;
}
declare module '../types/any/anySchema' {
    interface AnySchema {
        if(params: When): this;
    }
}
