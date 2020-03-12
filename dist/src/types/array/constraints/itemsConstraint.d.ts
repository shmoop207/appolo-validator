import { IConstraint, IConstraintValidateResult, ValidationParams } from "../../../interfaces/IConstraint";
import { ValidationError } from "../../../common/errors/ValidationError";
import { IClass } from "appolo-engine";
import { IConstraintOptions } from "../../../interfaces/IConstraintOptions";
import { Schema } from "../../../schema/registerSchema";
export declare class ItemsConstraint implements IConstraint {
    validate(params: ValidationParams): Promise<IConstraintValidateResult>;
    static handleErrors(params: ValidationParams, results: {
        errors: ValidationError[];
        value: any;
    }[]): ValidationError[];
    get type(): string;
    get defaultMessage(): string;
}
declare module '../arraySchema' {
    interface ArraySchema {
        items(schema?: Schema | Schema[] | IClass | IClass[], options?: IConstraintOptions): this;
    }
}
