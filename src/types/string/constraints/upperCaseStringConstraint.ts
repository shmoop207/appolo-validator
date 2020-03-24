import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {ArraySchema} from "../../array/arraySchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {ArrayConstraint} from "../../array/constraints/arrayConstraint";
import {StringSchema} from "../stringSchema";


export class UpperCaseStringConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let value: string = params.value;

        return {isValid: typeof value == "string" && params.value.toUpperCase() === params.value};
    }

    public get type(): string {
        return "string"
    }

    public get defaultMessage(): string {
        return "${property} is not valid upperCase string"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "uppercase",
    constraint: UpperCaseStringConstraint
});


