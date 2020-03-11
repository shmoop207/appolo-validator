import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {StringSchema} from "../stringSchema";
import {Ref} from "../../../schema/ref";

export class SizeStringConstraint implements IConstraint {

    public validate(params: ValidationParams): IConstraintValidateResult {
        const value: string = params.value;

        return {isValid: typeof value == "string" && value.length == params.args[0]};
    }

    public get type(): string {
        return "string"
    }

    public get defaultMessage(): string {
        return "${property} must be of size ${arg0}"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "size",
    constraint: SizeStringConstraint
});

declare module '../stringSchema' {

    interface StringSchema {
        size(limit: number | Ref, options?: IConstraintOptions): this;
    }
}
