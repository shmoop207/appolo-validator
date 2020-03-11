import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {NumberSchema} from "../numberSchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Ref} from "../../../schema/ref";

export class PortNumberConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let options = params.options, value = params.value;

        return {isValid: value >= 0 && value <= 65535};
    }

    public get type(): string {
        return "positive"
    }

    public get defaultMessage(): string {
        return "${property} must be a valid port"
    }
}

registerConstraint.extend({
    base: NumberSchema,
    name: "port",
    constraint: PortNumberConstraint
});

declare module '../numberSchema' {

    interface NumberSchema {
        port(options?: IConstraintOptions): this;
    }
}
