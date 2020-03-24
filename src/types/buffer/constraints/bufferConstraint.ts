import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {ArraySchema} from "../../array/arraySchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {ArrayConstraint} from "../../array/constraints/arrayConstraint";
import {BufferSchema} from "../bufferSchema";


export class BufferConstraint implements IConstraint {

    public  validate(args: ValidationParams): IConstraintValidateResult {

        let options = args.options, value = args.value;

        return {isValid: Buffer.isBuffer(value)};


        return {isValid: true};
    }

    public get type(): string {
        return "buffer"
    }

    public get defaultMessage(): string {
        return "${property} is not valid buffer"
    }
}

registerConstraint.extend({
    base: BufferSchema,
    name: "isBuffer",
    constraint: BufferConstraint
});


