import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {DateSchema} from "../dateSchema";
import {parse, toDate, isValid, parseISO, parseJSON} from "date-fns";


export class isDateConstraint implements IConstraint {

    public  validate(args: ValidationParams): IConstraintValidateResult{

        let options = args.options, value = args.value;
        if (value instanceof Date && !isNaN(value.getTime()) && isValid(value)) {
            return {isValid: true};
        }

        return {isValid: false};
    }

    public get type(): string {
        return "date"
    }

    public get defaultMessage(): string {
        return "${property} is not valid date"
    }
}

registerConstraint.extend({
    base: DateSchema,
    name: "isDate",
    constraint: isDateConstraint
});

declare module '../dateSchema' {

    interface DateSchema {
        isDate(options?: IConstraintOptions): this;
    }
}
