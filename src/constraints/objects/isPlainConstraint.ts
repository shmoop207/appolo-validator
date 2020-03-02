import {Objects, Promises} from "appolo-utils/index";
import {AnySchema} from "../../schema/types/anySchema";
import {ValidationError} from "../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";
import {registerConstraint} from "../registerConstraint";
import {ObjectSchema} from "../../schema/types/objectSchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";


export class IsPlainConstraint implements IConstraint {

    public async validate(args: ValidationParams): Promise<IConstraintValidateResult> {

        let isValid = Objects.isPlain(args.value);

        return {isValid};

    }

    public get type(): string {
        return "isPlain"
    }

    public defaultMessage(args: ValidationParams): string {
        return `is not a valid object`
    }
}

registerConstraint.extend({
    base: ObjectSchema,
    name: "isPlain",
    constraint: IsPlainConstraint
});

declare module '../../schema/types/objectSchema' {

    interface ObjectSchema {
        isPlain( options?: IConstraintOptions): this;
    }
}

