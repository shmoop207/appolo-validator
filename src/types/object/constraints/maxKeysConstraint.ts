import {AnySchema} from "../../any/anySchema";
import {ValidationError} from "../../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {ObjectSchema} from "../objectSchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Ref} from "../../../schema/ref";


export class MaxKeysConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let isValid = Object.keys(params.value || {}).length <= params.args[0];

        return {isValid};

    }

    public get type(): string {
        return "MaxKeys"
    }

    public get defaultMessage(): string {
        return "${property} has invalid max keys size"
    }
}

registerConstraint.extend({
    base: ObjectSchema,
    name: "maxKeys",
    constraint: MaxKeysConstraint
});

declare module '../objectSchema' {


    interface ObjectSchema {
        maxKeys(limit: number | Ref, options?: IConstraintOptions): this;
    }
}

