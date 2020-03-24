import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {ArraySchema} from "../../array/arraySchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {ArrayConstraint} from "../../array/constraints/arrayConstraint";
import {StringSchema} from "../stringSchema";


export class StringConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let  value:string = params.value;

        if (typeof params.value !== "string") {
            return {isValid: false};
        }

        return {isValid: true};
    }

    public get type(): string {
        return "string"
    }

    public get defaultMessage(): string {
        return "${property} is not valid string"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "isString",
    constraint: StringConstraint
});


