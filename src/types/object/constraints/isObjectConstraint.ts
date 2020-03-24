import {AnySchema} from "../../any/anySchema";
import {ValidationError} from "../../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {ObjectSchema} from "../objectSchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Util} from "appolo-utils";


export class IsObjectConstraint implements IConstraint {

    public validate(params: ValidationParams): IConstraintValidateResult {

        let isValid = Util.objects.isObject(params.value);

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


