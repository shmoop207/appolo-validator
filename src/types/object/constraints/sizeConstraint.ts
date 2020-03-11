import {AnySchema} from "../../any/anySchema";
import {ValidationError} from "../../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {ObjectSchema} from "../objectSchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Ref} from "../../../schema/ref";


export class SizeConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let isValid = Object.keys(params.value || {}).length == params.args[0];

        return {isValid};

    }

    public get type(): string {
        return "Size"
    }

    public get defaultMessage(): string {
        return "${property} has invalid keys size"
    }
}

registerConstraint.extend({
    base: ObjectSchema,
    name: "size",
    constraint: SizeConstraint
});

declare module '../objectSchema' {


    interface ObjectSchema {
        size(limit: number | Ref, options?: IConstraintOptions): this;
    }
}

