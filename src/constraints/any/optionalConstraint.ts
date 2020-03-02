import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";
import {registerConstraint} from "../registerConstraint";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {AnySchema} from "../../schema/types/anySchema";


export class OptionalConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let value = params.value;

        return {isValid: value === undefined};
    }

    public get type(): string {
        return "optional"
    }

    public defaultMessage(args: ValidationParams): string {
        return `${args.property || args.value} is required`
    }
}

registerConstraint.extend({
    base: AnySchema,
    name: "optional",
    constraint: OptionalConstraint,
    whiteList:true
});

declare module '../../schema/types/anySchema' {

    interface AnySchema {
        optional(options?: IConstraintOptions): this;
    }
}
