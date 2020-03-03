import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {NumberSchema} from "../numberSchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Ref} from "../../../schema/ref";

export class MaxNumberConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let options = params.options, value = params.value;

        return {isValid: value <= params.args[0]};
    }

    public get type(): string {
        return "maxNumber"
    }

    public defaultMessage(args: ValidationParams): string {
        return `${args.value} max that was expected for this number`
    }
}

registerConstraint.extend({
    base: NumberSchema,
    name: "max",
    constraint: MaxNumberConstraint
});

declare module '../numberSchema' {

    interface NumberSchema {
        max(max: number | Ref, options?: IConstraintOptions): this;
    }
}
