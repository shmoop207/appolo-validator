import {IConverter} from "../../../interfaces/IConverter";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {ObjectSchema} from "../objectSchema";
import {Util} from "@appolo/utils";
import {registerConstraint} from "../../../schema/registerConstraint";

export class MongoObjectSanitizeConstraint implements IConstraint {

    public validate(params: ValidationParams): IConstraintValidateResult {
        let value: object = params.value,
            isValid = true;

        let str = Util.objects.tryStringifyJSON(value);

        if (str.includes("$where")) {
            isValid = false
        }

        return {isValid};
    }

    public get type(): string {
        return "with"
    }

    public get defaultMessage(): string {
        return "${property} has invalid keys"
    }
}

registerConstraint.extend({
    base: ObjectSchema,
    name: "mongoSanitize",
    constraint: MongoObjectSanitizeConstraint
});



