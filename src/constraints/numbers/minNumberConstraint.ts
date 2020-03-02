import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";
import {registerConstraint} from "../registerConstraint";
import {NumberSchema} from "../../schema/types/numberSchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {Ref} from "../../schema/types/ref";

export class MinNumberConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let options = params.options, value = params.value;

        return {isValid: value >= params.args[0]};
    }

    public get type(): string {
        return "minNumber"
    }

    public defaultMessage(args: ValidationParams): string {
        return `${args.value} min that was expected for this number`
    }
}

registerConstraint.extend({
    base: NumberSchema,
    name: "min",
    constraint: MinNumberConstraint
});

declare module '../../schema/types/numberSchema' {

    interface NumberSchema {
        min(min: number | Ref, options?: IConstraintOptions): this;
    }
}
