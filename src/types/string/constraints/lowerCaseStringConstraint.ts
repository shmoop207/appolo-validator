import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {ArraySchema} from "../../array/arraySchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {ArrayConstraint} from "../../array/constraints/arrayConstraint";
import {StringSchema} from "../stringSchema";


export class LowerCaseStringConstraint implements IConstraint {

    public  validate(args: ValidationParams): IConstraintValidateResult {

        let value:string = args.value;

        return {isValid: typeof value == "string"&& args.value.toLowerCase() === args.value};
    }

    public get type(): string {
        return "string"
    }

    public get defaultMessage(): string {
        return "${property} is not valid lowerCase string"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "lowercase",
    constraint: LowerCaseStringConstraint
});

declare module '../stringSchema' {

    interface StringSchema {
        lowercase(options?: IConstraintOptions): this;
    }
}
