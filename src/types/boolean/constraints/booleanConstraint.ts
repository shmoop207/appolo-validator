import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {BooleanSchema} from "../booleanSchema";


export class BooleanConstraint implements IConstraint {

    public  validate(args: ValidationParams): IConstraintValidateResult {

        let value = args.value;

        return {isValid: value === true || value === false};

    }

    public get type(): string {
        return "boolean"
    }

    public get defaultMessage(): string {
        return "${property} is not valid boolean"
    }
}

registerConstraint.extend({
    base: BooleanSchema,
    name: "isBoolean",
    constraint: BooleanConstraint
});

