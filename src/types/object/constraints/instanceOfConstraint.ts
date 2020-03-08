import {AnySchema} from "../../any/anySchema";
import {ValidationError} from "../../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {ObjectSchema} from "../objectSchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";


export class InstanceOfConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let isValid = params.value instanceof params.args[0];

        return {isValid};

    }

    public get type(): string {
        return "isPlain"
    }

    public get defaultMessage(): string {
        return "${property} is not instanceof"
    }
}

registerConstraint.extend({
    base: ObjectSchema,
    name: "instanceOf",
    constraint: InstanceOfConstraint
});

declare module '../objectSchema' {

    interface ObjectSchema {
        instanceOf(value:any, options?: IConstraintOptions): this;
    }
}

