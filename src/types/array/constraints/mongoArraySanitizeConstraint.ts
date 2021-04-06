import {IConverter} from "../../../interfaces/IConverter";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConverter} from "../../../schema/registerConverter";
import {IConverterOptions} from "../../../interfaces/IConverterOptions";
import {Util} from "@appolo/utils";
import {registerConstraint} from "../../../schema/registerConstraint";
import {ArraySchema} from "../arraySchema";

export class MongoArraySanitizeConstraint implements IConstraint {

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
    base: ArraySchema,
    name: "mongoSanitize",
    constraint: MongoArraySanitizeConstraint
});



