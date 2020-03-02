import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";
import {registerConstraint} from "../registerConstraint";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {AnySchema} from "../../schema/types/anySchema";


export class AllowConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let allowed: any[] = params.args[0], value = params.value;

        if (!allowed || !allowed.length) {
            return {isValid: true}
        }

        for (let i = 0; i < allowed.length; i++) {
            let allowedItem = allowed[i];

            if (allowedItem === value || (isNaN(allowedItem) && isNaN(value))) {
                return {isValid: true};
            }
        }

        return {isValid: false};
    }

    public get type(): string {
        return "allow"
    }

    public defaultMessage(args: ValidationParams): string {
        return `${args.property || args.value} is required`
    }
}
registerConstraint.extend({
    base: AnySchema,
    name: "allow",
    constraint: AllowConstraint,
    whiteList:true
});

declare module '../../schema/types/anySchema' {

    interface AnySchema {
        allow(values: any[], options?: IConstraintOptions): this;
    }
}
