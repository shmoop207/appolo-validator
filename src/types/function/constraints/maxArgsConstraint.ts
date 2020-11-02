import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";

import {FunctionSchema} from "../functionSchema";


export class MaxArgsConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let isValid = params.value.length <= params.args[0] ;

        return {isValid};

    }

    public get type(): string {
        return "MaxArgs"
    }

    public get defaultMessage(): string {
        return "${property} args is over max args size"
    }
}

registerConstraint.extend({
    base: FunctionSchema,
    name: "maxArgs",
    constraint: MaxArgsConstraint
});



