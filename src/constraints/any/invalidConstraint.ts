import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";
import {registerConstraint} from "../../schema/registerConstraint";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {AnySchema} from "../../schema/types/anySchema";
import {truncate} from "fs";


export class InvalidConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let valid: any[] = params.args[0], value = params.value;

        if (!valid || !valid.length) {
            return {isValid: true}
        }

        for (let i = 0; i < valid.length; i++) {
            let validItem = valid[i];

            if (validItem === value) {
                return {isValid: false};
            }
        }

        return {isValid: true};
    }

    public get type(): string {
        return "invalid"
    }

    public defaultMessage(args: ValidationParams): string {
        return `${args.property || args.value} is not valid`
    }
}

registerConstraint.extend({
    base: AnySchema,
    name: "invalid",
    constraint: InvalidConstraint,
    blackList: true
});

declare module '../../schema/types/anySchema' {

    interface AnySchema {
        invalid(values: any[], options?: IConstraintOptions): this;
    }
}
