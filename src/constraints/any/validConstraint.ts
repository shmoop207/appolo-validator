import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";
import {registerConstraint} from "../../schema/registerConstraint";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {AnySchema} from "../../schema/types/anySchema";
import {truncate} from "fs";


export class ValidConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let valid: any[] = params.args[0], value = params.value;

        if (!valid || !valid.length) {
            return {isValid: true}
        }

        for (let i = 0; i < valid.length; i++) {
            let validItem = valid[i];

            if (validItem === value || (isNaN(validItem) && isNaN(value))) {
                return {isValid: true};
            }
        }

        return {isValid: false};
    }

    public get type(): string {
        return "equals"
    }

    public defaultMessage(args: ValidationParams): string {
        return `${args.property || args.value} is not valid`
    }
}

registerConstraint.extend({
    base: AnySchema,
    name: "valid",
    constraint: ValidConstraint,
    blackList: true
});

declare module '../../schema/types/anySchema' {

    interface AnySchema {
        valid(values: any[], options?: IConstraintOptions): this;
    }
}
