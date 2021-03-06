import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {AnySchema} from "../anySchema";


export class OptionalConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let value = params.value;

        return {isValid: value === undefined};
    }

    public get type(): string {
        return "optional"
    }

    public get defaultMessage(): string {
        return ""
    }
}

registerConstraint.extend({
    base: AnySchema,
    name: "optional",
    constraint: OptionalConstraint,
    whiteList:true
});

