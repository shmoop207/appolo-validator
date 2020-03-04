import {IConverter} from "../../../interfaces/IConverter";
import {ValidationParams} from "../../../interfaces/IConstraint";
import {registerConverter} from "../../../schema/registerConverter";
import {IConverterOptions} from "../../../interfaces/IConverterOptions";
import {DateSchema} from "../dateSchema";
import {parse, toDate, isValid, parseISO, parseJSON} from "date-fns";

export class DateConverter implements IConverter {

    public convert(params: ValidationParams): Promise<any> | any {

        let value = params.value;

        if (!(value instanceof Date)) {
            return value
        }

        let date = Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate(),
            value.getUTCHours(), value.getUTCMinutes(), value.getUTCSeconds());

        return new Date(date);
    }
}

registerConverter.extend({
    base: DateSchema,
    name: "toUtc",
    converter: DateConverter
});

declare module '../dateSchema' {

    interface DateSchema {
        toUtc(options?: IConverterOptions): this;
    }
}
