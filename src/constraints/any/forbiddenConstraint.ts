import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";
import {registerConstraint} from "../registerConstraint";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {AnySchema} from "../../schema/types/anySchema";


export class ForbiddenConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let value = params.value;

        return {isValid: value === undefined};
    }

    public get type(): string {
        return "forbidden"
    }

    public defaultMessage(args: ValidationParams): string {
        return `${args.property || args.value} is forbidden`
    }
}

registerConstraint.extend({
    base: AnySchema,
    name: "forbidden",
    constraint: ForbiddenConstraint,
    blackList: true
});

declare module '../../schema/types/anySchema' {

    interface AnySchema {
        forbidden(options?: IConstraintOptions): this;
    }
}
