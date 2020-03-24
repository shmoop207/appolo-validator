import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {AnySchema} from "../anySchema";
import {truncate} from "fs";


export class InvalidConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let valid: any[] = params.args[0], value = params.value;

        if (!valid || !valid.length) {
            return {isValid: true}
        }

        for (let i = 0; i < valid.length; i++) {
            let validItem = valid[i];

            if (validItem === value) {
                return {isValid: false};
            }
        }

        return {isValid: true};
    }

    public get type(): string {
        return "invalid"
    }

    public get defaultMessage(): string {
        return "${property} has invalid values"
    }
}

registerConstraint.extend({
    base: AnySchema,
    name: "invalid",
    constraint: InvalidConstraint,
    blackList: true
});
