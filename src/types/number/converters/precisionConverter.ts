import {IConverter} from "../../../interfaces/IConverter";
import {ValidationParams} from "../../../interfaces/IConstraint";
import {NumberSchema} from "../numberSchema";
import {registerConverter} from "../../../schema/registerConverter";
import {IConverterOptions} from "../../../interfaces/IConverterOptions";
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

