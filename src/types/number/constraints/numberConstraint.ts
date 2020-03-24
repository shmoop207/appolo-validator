import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {NumberSchema} from "../numberSchema";
import {Ref} from "../../../schema/ref";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {MinNumberConstraint} from "./minNumberConstraint";


export class NumberConstraint implements IConstraint {

    public async validate(args: ValidationParams): Promise<IConstraintValidateResult> {

        let options = args.options, value = args.value;

        if (typeof args.value !== "number") {
            return {isValid: false};
        }

        return {isValid: Number.isFinite(value)};
    }

    public get type(): string {
        return "number"
    }

    public get defaultMessage(): string {
        return "${property} must be a number"
    }
}

registerConstraint.extend({
    base: NumberSchema,
    name: "float",
    constraint: NumberConstraint
});


