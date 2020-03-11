import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Ref} from "../../../schema/ref";
import {BufferSchema} from "../bufferSchema";


export class MaxConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let isValid = params.value.length <= params.args[0];

        return {isValid};

    }

    public get type(): string {
        return "max"
    }

    public get defaultMessage(): string {
        return "${property} contains more bytes then ${arg0}"
    }
}

registerConstraint.extend({
    base: BufferSchema,
    name: "max",
    constraint: MaxConstraint
});

declare module '../bufferSchema' {


    interface BufferSchema {
        max(limit: number | Ref, options?: IConstraintOptions): this;
    }
}

