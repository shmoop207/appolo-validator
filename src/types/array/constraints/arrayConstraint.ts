import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {NumberSchema} from "../../number/numberSchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {NumberConstraint} from "../../number/constraints/numberConstraint";
import {ArraySchema} from "../arraySchema";


export class ArrayConstraint implements IConstraint {

    public async validate(args: ValidationParams): Promise<IConstraintValidateResult> {

        let isValid = Array.isArray(args.value);

        return {isValid};
    }

    public get type(): string {
        return "array"
    }

    public defaultMessage(args: ValidationParams): string {
        return `value is not a valid array`
    }
}

registerConstraint.extend({
    base: ArraySchema,
    name: "isArray",
    constraint: ArrayConstraint
});

declare module '../arraySchema' {

    interface ArraySchema {
        isArray(options?: IConstraintOptions): this;
    }
}
