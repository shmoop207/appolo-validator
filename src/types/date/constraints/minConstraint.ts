import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {DateSchema} from "../dateSchema";
import {parse, toDate, isValid, parseISO, parseJSON} from "date-fns";
import {MaxConstraint} from "./maxConstraint";
import {Ref} from "../../../schema/ref";
import {DateConverter} from "../converters/dateConverter";
import {ValidationError} from "../../../common/errors/ValidationError";

export class MinConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let options = params.options, value = params.value, minValue = params.args[0], format = params.args[1];

        if (!(value instanceof Date)) {
            return {isValid: false};
        }

        let minDate = DateConverter.convertValueToDate(minValue, format);

        if (!minDate) {
            return {isValid: false, errors: [new ValidationError("invalid min Date")]};
        }

        return {isValid: value.getTime() >= minDate.getTime()};
    }

    public get type(): string {
        return "date"
    }

    public get defaultMessage(): string {
        return "${property} is under min date"
    }
}

registerConstraint.extend({
    base: DateSchema,
    name: "min",
    constraint: MinConstraint
});

declare module '../dateSchema' {


    interface DateSchema {
        min(date: Date | string | number | Ref,format?:string, options?: IConstraintOptions): this;
    }
}
