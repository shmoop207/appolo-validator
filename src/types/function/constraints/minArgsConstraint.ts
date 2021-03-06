
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {FunctionSchema} from "../functionSchema";


export class MinArgsConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let isValid = params.value.length >= params.args[0] ;

        return {isValid};

    }

    public get type(): string {
        return "MinArgs"
    }

    public get defaultMessage(): string {
        return "${property} args is under min args size"
    }
}

registerConstraint.extend({
    base: FunctionSchema,
    name: "minArgs",
    constraint: MinArgsConstraint
});


