import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {NumberSchema} from "../numberSchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Ref} from "../../../schema/ref";

export class MinNumberConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let options = params.options, value = params.value;

        return {isValid: value >= params.args[0]};
    }

    public get type(): string {
        return "minNumber"
    }

    public get defaultMessage(): string {
        return "${property} must be larger than ${arg0}"
    }
}

registerConstraint.extend({
    base: NumberSchema,
    name: "min",
    constraint: MinNumberConstraint
});

declare module '../numberSchema' {

    interface NumberSchema {
        min(min: number | Ref, options?: IConstraintOptions): this;
    }
}
