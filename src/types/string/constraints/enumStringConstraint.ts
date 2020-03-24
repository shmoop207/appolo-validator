import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {StringSchema} from "../stringSchema";
import {Enums} from "appolo-utils";

export class EnumStringConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let value: string = params.value, enums = Enums.enumValues(params.args[0]);

        return {isValid: enums.indexOf(value) > -1};
    }

    public get type(): string {
        return "string"
    }

    public get defaultMessage(): string {
        return "${property} is not valid enum"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "enum",
    constraint: EnumStringConstraint
});


