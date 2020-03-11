import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {AnySchema} from "../anySchema";


export class RequiredConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let value = params.value;

        return {isValid: value !== undefined};
    }

    public get type(): string {
        return "required"
    }

    public get defaultMessage(): string {
        return "${property} is required"
    }
}

registerConstraint.extend({
    base: AnySchema,
    name: "required",
    constraint: RequiredConstraint,
    blackList: true
});

declare module '../anySchema' {

    interface AnySchema {
        required(options?: IConstraintOptions): this;
    }
}
