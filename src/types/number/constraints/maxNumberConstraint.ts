import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {NumberSchema} from "../numberSchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Ref} from "../../../schema/ref";

export class MaxNumberConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let options = params.options, value = params.value;

        return {isValid: value <= params.args[0]};
    }

    public get type(): string {
        return "maxNumber"
    }

    public get defaultMessage(): string {
        return "${property} must be smaller than ${arg0}"
    }
}

registerConstraint.extend({
    base: NumberSchema,
    name: "max",
    constraint: MaxNumberConstraint
});

