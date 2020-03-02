import {IConverter} from "../IConverter";
import {ValidationParams} from "../../constraints/IConstraint";
import {NumberSchema} from "../../schema/types/numberSchema";
import {registerConverter} from "../registerConverter";
import {IConverterOptions} from "../../interfaces/IConverterOptions";
import {Numbers} from "appolo-utils";

export class PrecisionConverter implements IConverter {

    public convert(params: ValidationParams): Promise<any> | any {
        let value = typeof params.value === 'number'
            ? Numbers.toFixed(params.value, params.args[0])
            : params.value;

        return value;
    }
}

registerConverter.extend({
    base: NumberSchema,
    name: "toPrecision",
    converter: PrecisionConverter
});

declare module '../../schema/types/numberSchema' {

    interface NumberSchema {
        toPrecision(precision: number, options?: IConverterOptions): this;
    }
}
