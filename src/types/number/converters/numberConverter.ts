import {IConverter} from "../../../interfaces/IConverter";
import {ValidationParams} from "../../../interfaces/IConstraint";
import {NumberSchema} from "../numberSchema";
import {registerConverter} from "../../../schema/registerConverter";
import {IConverterOptions} from "../../../interfaces/IConverterOptions";

export class NumberConverter implements IConverter {

    public convert(params: ValidationParams): Promise<any> | any {
        return typeof params.value === 'string' ? parseFloat(params.value) : params.value
    }
}

registerConverter.extend({
    base: NumberSchema,
    name: "toFloat",
    converter: NumberConverter
});

