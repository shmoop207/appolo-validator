import {AnySchema} from "../../any/anySchema";
import {ValidationError} from "../../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {ObjectSchema} from "../objectSchema";
import {Objects} from "appolo-utils";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";


export class IsPlainConstraint implements IConstraint {

    public  validate(args: ValidationParams): IConstraintValidateResult {

        let isValid = Objects.isPlain(args.value);

        return {isValid};

    }

    public get type(): string {
        return "isPlain"
    }

    public get defaultMessage(): string {
        return "${property} is not valid object"
    }
}

registerConstraint.extend({
    base: ObjectSchema,
    name: "isPlain",
    constraint: IsPlainConstraint
});


