import {IConverter} from "../../../interfaces/IConverter";
import {ValidationParams} from "../../../interfaces/IConstraint";
import {registerConverter} from "../../../schema/registerConverter";
import {IConverterOptions} from "../../../interfaces/IConverterOptions";
import {StringSchema} from "../stringSchema";

export class TruncateConverter implements IConverter {

    public convert(params: ValidationParams): Promise<any> | any {
        let value: string = params.value, limit: number = params.args[0];

        if (!(typeof value === 'string')) {
            return value;
        }

        if (value.length <= limit) {
            return value;
        }

        return value.slice(0, limit) + '...'
    }
}

registerConverter.extend({
    base: StringSchema,
    name: "truncate",
    converter: TruncateConverter
});


declare module '../stringSchema' {

    interface StringSchema {
        truncate(limit: number, options?: IConverterOptions): this;
    }
}

