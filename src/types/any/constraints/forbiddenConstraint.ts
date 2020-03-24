import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {AnySchema} from "../anySchema";


export class ForbiddenConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let value = params.value;

        return {isValid: value === undefined};
    }

    public get type(): string {
        return "forbidden"
    }

    public get defaultMessage(): string {
        return "${property} is forbidden"
    }
}

registerConstraint.extend({
    base: AnySchema,
    name: "forbidden",
    constraint: ForbiddenConstraint,
    blackList: true
});

