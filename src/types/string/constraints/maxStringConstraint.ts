import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {StringSchema} from "../stringSchema";

export class MaxStringConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {
        const value:string = params.value;

        return {isValid: typeof value == "string"&& value.length <= params.args[0]};
    }

    public get type(): string {
        return "string"
    }

    public get defaultMessage(): string {
        return "${property} length must be at most ${arg0}"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "max",
    constraint: MaxStringConstraint
});

declare module '../stringSchema' {

    interface StringSchema {
        max(limit: number, options?: IConstraintOptions): this;
    }
}
