import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {ArraySchema} from "../../array/arraySchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {ArrayConstraint} from "../../array/constraints/arrayConstraint";
import {StringSchema} from "../stringSchema";


export class AsciiStringConstraint implements IConstraint {

    public  validate(args: ValidationParams):IConstraintValidateResult {

        let value: string = args.value;

        return {isValid: typeof value == "string" && new RegExp("^[\x00-\x7F]+$").test(value)};
    }

    public get type(): string {
        return "string"
    }

    public get defaultMessage(): string {
        return "${property} is not valid ascii string"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "ascii",
    constraint: AsciiStringConstraint
});


