import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {NumberSchema} from "../numberSchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Ref} from "../../../schema/ref";

export class IntegerNumberConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let options = params.options, value = params.value;

        return {isValid: Number.isInteger(value)};
    }

    public get type(): string {
        return "integer"
    }

    public get defaultMessage(): string {
        return "${property} must be an integer number"
    }
}

registerConstraint.extend({
    base: NumberSchema,
    name: "integer",
    constraint: IntegerNumberConstraint
});

declare module '../numberSchema' {

    interface NumberSchema {
        integer(options?: IConstraintOptions): this;
    }
}
