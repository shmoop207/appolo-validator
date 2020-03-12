import {AnySchema} from "../../any/anySchema";
import {ValidationError} from "../../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {ObjectSchema} from "../objectSchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Util} from "appolo-utils";


export class IsObjectOrClassConstraint implements IConstraint {

    public validate(params: ValidationParams): IConstraintValidateResult {

        let isValid = Util.objects.isObject(params.value) || Util.classes.isClass(params.value);

        return {isValid};

    }

    public get type(): string {
        return "isObjectOrClass"
    }

    public get defaultMessage(): string {
        return "${property} is not valid object"
    }
}

registerConstraint.extend({
    base: ObjectSchema,
    name: "isObjectOrClass",
    constraint: IsObjectOrClassConstraint
});

declare module '../objectSchema' {

    interface ObjectSchema {
        isObjectOrClass(options?: IConstraintOptions): this;
    }
}

