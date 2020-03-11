import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {StringSchema} from "../stringSchema";

export class UuidStringConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {
        const value:string = params.value;

        return {isValid: typeof value == "string"&& params.args[0].test(value)};
    }

    public get type(): string {
        return "string"
    }

    public get defaultMessage(): string {
        return "${property} do not match regex"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "regex",
    constraint: UuidStringConstraint
});

declare module '../stringSchema' {

    interface StringSchema {
        regex(regex: RegExp, options?: IConstraintOptions): this;
    }
}
