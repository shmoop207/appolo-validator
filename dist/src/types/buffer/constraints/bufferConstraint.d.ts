import { IConstraint, IConstraintValidateResult, ValidationParams } from "../../../interfaces/IConstraint";
import { IConstraintOptions } from "../../../interfaces/IConstraintOptions";
export declare class BufferConstraint implements IConstraint {
    validate(args: ValidationParams): IConstraintValidateResult;
    get type(): string;
    get defaultMessage(): string;
}
declare module '../bufferSchema' {
    interface BufferSchema {
        isBuffer(options?: IConstraintOptions): this;
    }
}
