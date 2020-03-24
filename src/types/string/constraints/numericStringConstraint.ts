import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {StringSchema} from "../stringSchema";

export class NumericStringConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {
        const value:string = params.value;

        return {isValid: typeof value == "string"&& new RegExp("^[+-]?([0-9]*[.])?[0-9]+$").test(value)};
    }

    public get type(): string {
        return "string"
    }

    public get defaultMessage(): string {
        return "${property} is not valid numeric string"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "numeric",
    constraint: NumericStringConstraint
});


