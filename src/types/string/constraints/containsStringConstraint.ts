import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {StringSchema} from "../stringSchema";

export class ContainsStringConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {
        const value: string = params.value;

        return {isValid: typeof value == "string"&& value.indexOf(params.args[0]) > -1};
    }

    public get type(): string {
        return "string"
    }

    public get defaultMessage(): string {
        return "${property} dose not contain ${arg0}"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "contains",
    constraint: ContainsStringConstraint
});

declare module '../stringSchema' {

    interface StringSchema {
        contains(value: string, options?: IConstraintOptions): this;
    }
}
