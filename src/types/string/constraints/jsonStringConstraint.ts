import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {StringSchema} from "../stringSchema";
import {Objects} from "@appolo/utils";


export class JsonStringConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {
        let value: string = params.value;

        if (typeof value != "string") {
            return {isValid: false};
        }

        let obj = Objects.tryParseJSON(value);

        return {isValid: !!obj && typeof obj === 'object'}
    }

    public get type(): string {
        return "string"
    }

    public get defaultMessage(): string {
        return "${property} is not valid json string"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "json",
    constraint: JsonStringConstraint
});


