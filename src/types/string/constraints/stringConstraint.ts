import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {ArraySchema} from "../../array/arraySchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {ArrayConstraint} from "../../array/constraints/arrayConstraint";
import {StringSchema} from "../stringSchema";


export class StringConstraint implements IConstraint {

    public async validate(args: ValidationParams): Promise<IConstraintValidateResult> {

        let options = args.options, value = args.value;

        if (typeof args.value !== "string") {
            return {isValid: false};
        }

        return {isValid: true};
    }

    public get type(): string {
        return "string"
    }

    public get defaultMessage(): string {
        return "${property} is not valid string"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "isString",
    constraint: StringConstraint
});

declare module '../stringSchema' {

    interface StringSchema {
        isString(options?: IConstraintOptions): this;
    }
}
