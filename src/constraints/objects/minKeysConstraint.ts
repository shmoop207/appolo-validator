import {Objects, Promises} from "appolo-utils/index";
import {AnySchema} from "../../schema/types/anySchema";
import {ValidationError} from "../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";
import {registerConstraint} from "../registerConstraint";
import {ObjectSchema} from "../../schema/types/objectSchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {Ref} from "../../schema/types/ref";


export class MinKeysConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let isValid = Object.keys(params.value || {}).length >= params.args[0];

        return {isValid};

    }

    public get type(): string {
        return "MinKeys"
    }

    public defaultMessage(args: ValidationParams): string {
        return `is not valid size`
    }
}

registerConstraint.extend({
    base: ObjectSchema,
    name: "minKeys",
    constraint: MinKeysConstraint
});

declare module '../../schema/types/objectSchema' {


    interface ObjectSchema {
        minKeys(limit: number | Ref, options?: IConstraintOptions): this;
    }
}

