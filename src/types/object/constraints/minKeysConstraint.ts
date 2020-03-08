import {AnySchema} from "../../any/anySchema";
import {ValidationError} from "../../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {ObjectSchema} from "../objectSchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Ref} from "../../../schema/ref";


export class MinKeysConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let isValid = Object.keys(params.value || {}).length >= params.args[0];

        return {isValid};

    }

    public get type(): string {
        return "MinKeys"
    }

    public get defaultMessage(): string {
        return "${property} has invalid min keys size"
    }
}

registerConstraint.extend({
    base: ObjectSchema,
    name: "minKeys",
    constraint: MinKeysConstraint
});

declare module '../objectSchema' {


    interface ObjectSchema {
        minKeys(limit: number | Ref, options?: IConstraintOptions): this;
    }
}

