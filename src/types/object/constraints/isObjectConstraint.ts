import {AnySchema} from "../../any/anySchema";
import {ValidationError} from "../../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {ObjectSchema} from "../objectSchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";


export class IsObjectConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let isValid = typeof params.value === "object";

        return {isValid};

    }

    public get type(): string {
        return "isObject"
    }

    public get defaultMessage(): string {
        return "${property} is not valid object"
    }
}

registerConstraint.extend({
    base: ObjectSchema,
    name: "isObject",
    constraint: IsObjectConstraint
});

declare module '../objectSchema' {

    interface ObjectSchema {
        isObject(options?: IConstraintOptions): this;
    }
}

