import { AnySchema } from "../../any/anySchema";
import { IConstraint, IConstraintValidateResult, ValidationParams } from "../../../interfaces/IConstraint";
import { IConstraintOptions } from "../../../interfaces/IConstraintOptions";
import { When } from "../../../when/when";
import { IClass } from "appolo-engine";
export declare class KeysConstraint implements IConstraint {
    validate(args: ValidationParams): Promise<IConstraintValidateResult>;
    private _validateProperty;
    get type(): string;
    get defaultMessage(): string;
}
declare module '../objectSchema' {
    interface ObjectSchema {
        keys(schemaIndex: IClass | {
            [index: string]: AnySchema | Pick<When, any>;
        }, options?: IConstraintOptions): this;
    }
}
