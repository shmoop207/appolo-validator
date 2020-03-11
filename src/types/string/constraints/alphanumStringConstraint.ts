import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {ArraySchema} from "../../array/arraySchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {ArrayConstraint} from "../../array/constraints/arrayConstraint";
import {StringSchema} from "../stringSchema";


export class AlphanumStringConstraint implements IConstraint {

    public validate(args: ValidationParams): IConstraintValidateResult {

        let value: string = args.value;

        return {isValid: typeof value == "string" && new RegExp("^[a-zA-Z0-9]+$").test(value)};
    }

    public get type(): string {
        return "string"
    }

    public get defaultMessage(): string {
        return "${property} is not valid alpha numeric string"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "alphanum",
    constraint: AlphanumStringConstraint
});

declare module '../stringSchema' {

    interface StringSchema {
        alphanum(options?: IConstraintOptions): this;
    }
}
