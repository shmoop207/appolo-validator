import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {NumberSchema} from "../numberSchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Ref} from "../../../schema/ref";

export class NegativeNumberConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let options = params.options, value = params.value;

        return {isValid: value < 0};
    }

    public get type(): string {
        return "negative"
    }

    public get defaultMessage(): string {
        return "${property} must be a negative number"
    }
}

registerConstraint.extend({
    base: NumberSchema,
    name: "negative",
    constraint: NegativeNumberConstraint
});

declare module '../numberSchema' {

    interface NumberSchema {
        negative(options?: IConstraintOptions): this;
    }
}
