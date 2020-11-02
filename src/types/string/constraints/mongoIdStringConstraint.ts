import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {StringSchema} from "../stringSchema";


export class JsonStringConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {
        let value: string = params.value;

        return {isValid: typeof value == "string" && /^(0x|0h)?[0-9A-F]+$/i.test(value) && value.length === 24}
    }

    public get type(): string {
        return "string"
    }

    public get defaultMessage(): string {
        return "${property} is not valid mongo id"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "mongoId",
    constraint: JsonStringConstraint
});


