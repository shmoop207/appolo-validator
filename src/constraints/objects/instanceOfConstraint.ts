import {Objects, Promises} from "appolo-utils/index";
import {AnySchema} from "../../schema/types/anySchema";
import {ValidationError} from "../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";
import {registerConstraint} from "../registerConstraint";
import {ObjectSchema} from "../../schema/types/objectSchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";


export class InstanceOfConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let isValid = params.value instanceof params.args[0];

        return {isValid};

    }

    public get type(): string {
        return "isPlain"
    }

    public defaultMessage(args: ValidationParams): string {
        return `is not instance of`
    }
}

registerConstraint.extend({
    base: ObjectSchema,
    name: "instanceOf",
    constraint: InstanceOfConstraint
});

declare module '../../schema/types/objectSchema' {

    interface ObjectSchema {
        instanceOf(value:any, options?: IConstraintOptions): this;
    }
}

