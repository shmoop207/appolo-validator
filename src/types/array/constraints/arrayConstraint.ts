import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {NumberSchema} from "../../number/numberSchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {NumberConstraint} from "../../number/constraints/numberConstraint";
import {ArraySchema} from "../arraySchema";


export class ArrayConstraint implements IConstraint {

    public validate(args: ValidationParams): IConstraintValidateResult {

        let isValid = Array.isArray(args.value);

        return {isValid};
    }

    public get type(): string {
        return "array"
    }

    public get defaultMessage(): string {
        return "${property} is not valid array"
    }
}

registerConstraint.extend({
    base: ArraySchema,
    name: "isArray",
    constraint: ArrayConstraint, blackList: true
});

