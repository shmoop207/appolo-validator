import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";
import {registerConstraint} from "../registerConstraint";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {AnySchema} from "../../schema/types/anySchema";


export class RequiredConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let value = params.value;

        return {isValid: value !== undefined};
    }

    public get type(): string {
        return "required"
    }

    public defaultMessage(args: ValidationParams): string {
        return `${args.property || args.value} is required`
    }
}

registerConstraint.extend({
    base: AnySchema,
    name: "required",
    constraint: RequiredConstraint,
    blackList: true
});

declare module '../../schema/types/anySchema' {

    interface AnySchema {
        required(options?: IConstraintOptions): this;
    }
}
