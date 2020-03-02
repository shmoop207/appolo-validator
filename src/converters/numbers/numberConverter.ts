import {IConverter} from "../IConverter";
import {ValidationParams} from "../../constraints/IConstraint";
import {NumberSchema} from "../../schema/types/numberSchema";
import {registerConverter} from "../registerConverter";
import {IConverterOptions} from "../../interfaces/IConverterOptions";

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

declare module '../../schema/types/numberSchema' {

    interface NumberSchema {
        toFloat(options?: IConverterOptions): this;
    }
}
