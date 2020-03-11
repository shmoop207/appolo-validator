import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {DateSchema} from "../dateSchema";
import {parse, toDate, isValid, parseISO, parseJSON} from "date-fns";
import {DateConverter} from "../converters/dateConverter";
import {ValidationError} from "../../../common/errors/ValidationError";


export class MaxConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let options = params.options, value = params.value, maxValue = params.args[0], format = params.args[1];

        if (!(value instanceof Date)) {
            return {isValid: false};
        }

        let maxDate = DateConverter.convertValueToDate(maxValue, format);

        if (!maxDate) {
            return {isValid: false, errors: [new ValidationError("invalid max Date")]};
        }

        return {isValid: value.getTime() <= maxDate.getTime()};
    }

    public get type(): string {
        return "date"
    }

    public get defaultMessage(): string {
        return "${property} is over max date"
    }
}

registerConstraint.extend({
    base: DateSchema,
    name: "max",
    constraint: MaxConstraint
});

declare module '../dateSchema' {

    interface DateSchema {
        max(date: Date | string | number, format?: string, options?: IConstraintOptions): this;
    }
}
