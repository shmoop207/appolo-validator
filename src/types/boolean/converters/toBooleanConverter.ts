import {IConverter} from "../../../interfaces/IConverter";
import {ValidationParams} from "../../../interfaces/IConstraint";
import {registerConverter} from "../../../schema/registerConverter";
import {IConverterOptions} from "../../../interfaces/IConverterOptions";
import {BooleanSchema} from "../booleanSchema";

export class ToBooleanConverter implements IConverter {

    public convert(params: ValidationParams): Promise<any> | any {
        let value = params.value;
        if (value === true || value === false) {
            return value;
        }

        let opts = params.args[0] || {};

        let trueValues = ["true", 1, "1"].concat(opts.truthy || []),
            falseValues = ["false", 0, "0"].concat(opts.falsy || []);

        if (trueValues.indexOf(value) > -1) {
            return true;
        }

        if (falseValues.indexOf(value) > -1) {
            return false;
        }

        return value;
    }
}

registerConverter.extend({
    base: BooleanSchema,
    name: "toBoolean",
    converter: ToBooleanConverter
});

declare module '../booleanSchema' {

    interface BooleanSchema {
        toBoolean(opts: { truthy?: any[], falsy?: any[] }, options?: IConverterOptions): this;
    }
}
