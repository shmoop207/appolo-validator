import {AnySchema} from "../../any/anySchema";
import {ValidationError} from "../../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Ref} from "../../../schema/ref";
import {ArraySchema} from "../arraySchema";


export class MaxConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let isValid = params.value.length <= params.args[0];

        return {isValid};

    }

    public get type(): string {
        return "max"
    }

    public get defaultMessage(): string {
        return "${property} has invalid max size"
    }
}

registerConstraint.extend({
    base: ArraySchema,
    name: "max",
    constraint: MaxConstraint
});

