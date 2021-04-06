import {IConverter} from "../../../interfaces/IConverter";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {StringSchema} from "../stringSchema";
import {registerConstraint} from "../../../schema/registerConstraint";

export class MongoSanitizeConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {
        let value: string = params.value;

        if (typeof value === "string" && value.includes("$where")) {
            value = value.replace("$where", "_");
        }

        return {isValid: typeof value == "string" && !value.includes("$where")}
    }

    public get type(): string {
        return "string"
    }

    public get defaultMessage(): string {
        return "${property} is not valid value"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "mongoSanitize",
    constraint: MongoSanitizeConstraint
});


