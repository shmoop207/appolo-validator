import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Ref} from "../../../schema/ref";
import {BufferSchema} from "../bufferSchema";


export class SizeConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let isValid = params.value.length == params.args[0];

        return {isValid};

    }

    public get type(): string {
        return "size"
    }

    public get defaultMessage(): string {
        return "${property} buffer has invalid length"
    }
}

registerConstraint.extend({
    base: BufferSchema,
    name: "size",
    constraint: SizeConstraint
});


