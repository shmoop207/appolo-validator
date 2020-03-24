import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {AnySchema} from "../anySchema";
import {truncate} from "fs";


export class ValidConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let valid: any[] = params.args[0], value = params.value;

        if (!valid || !valid.length) {
            return {isValid: true}
        }

        for (let i = 0; i < valid.length; i++) {
            let validItem = valid[i];

            if (validItem === value) {
                return {isValid: true};
            }
        }

        return {isValid: false};
    }

    public get type(): string {
        return "valid"
    }

    public get defaultMessage(): string {
        return "${property} has invalid value"
    }
}

registerConstraint.extend({
    base: AnySchema,
    name: "valid",
    constraint: ValidConstraint,
    blackList: true
});


