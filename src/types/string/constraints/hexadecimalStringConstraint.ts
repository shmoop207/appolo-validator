import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {ArraySchema} from "../../array/arraySchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {ArrayConstraint} from "../../array/constraints/arrayConstraint";
import {StringSchema} from "../stringSchema";


export class HexadecimalStringConstraint implements IConstraint {

    public  validate(args: ValidationParams): IConstraintValidateResult {

        let value: string = args.value;

        return {isValid: typeof value == "string" && /^(0x|0h)?[0-9A-F]+$/i.test(value)};
    }

    public get type(): string {
        return "string"
    }

    public get defaultMessage(): string {
        return "${property} is not valid hexadecimal string"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "hexadecimal",
    constraint: HexadecimalStringConstraint
});


