import {IConverter} from "../../../interfaces/IConverter";
import {ValidationParams} from "../../../interfaces/IConstraint";
import {registerConverter} from "../../../schema/registerConverter";
import {IConverterOptions} from "../../../interfaces/IConverterOptions";
import {DateSchema} from "../dateSchema";
import {parse, toDate, isValid, parseISO, parseJSON} from "date-fns";

export class DateConverter implements IConverter {

    public convert(params: ValidationParams): Promise<any> | any {

        let format = params.args[0], value = params.value;

        return DateConverter.convertValueToDate(value, format) || value

    }

    public static convertValueToDate(value: Date | number | string, format?: string): Date {
        if (value instanceof Date) {
            return value
        }

        return this._parseFormat(format, value as string) || this._parseISO(value as string) || this._parseNumber(value as number)
    }

    private static _parseNumber(value: number): Date {
        if (typeof value !== "number") {
            return null;
        }

        let date = toDate(value);

        return isValid(date) ? date : null;
    }

    private static _parseISO(value: string): Date {
        if (typeof value !== 'string') {
            return null;
        }

        let date = parseISO(value);

        return isValid(date) ? date : (isValid((date = parseJSON(value))) ? date : null);
    }

    private static _parseFormat(format: string, value: string): Date {

        if (!format) {
            return null
        }

        let date = parse((value || "").toString(), format, new Date());

        return isValid(date) ? date : null;
    }
}

registerConverter.extend({
    base: DateSchema,
    name: "format",
    converter: DateConverter
});
