import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {AnySchema} from "../anySchema";
import {AllowConstraint} from "./allowConstraint";


export class AllowEmptyConstraint implements IConstraint {

    public validate(params: ValidationParams): IConstraintValidateResult {

        let allowed = ['', null], value = params.value;

        if (!allowed || !allowed.length) {
            return {isValid: true}
        }

        for (let i = 0; i < allowed.length; i++) {
            let allowedItem = allowed[i];

            if (allowedItem === value) {
                return {isValid: true};
            }
        }

        return {isValid: false};
    }

    public get type(): string {
        return "allowEmpty"
    }

    public get defaultMessage(): string {
        return ""
    }
}

registerConstraint.extend({
    base: AnySchema,
    name: "allowEmpty",
    constraint: AllowConstraint,
    whiteList: true
});
