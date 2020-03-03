import {IConverter} from "../../../interfaces/IConverter";
import {ValidationParams} from "../../../interfaces/IConstraint";
import {NumberSchema} from "../numberSchema";
import {registerConverter} from "../../../schema/registerConverter";
import {IConverterOptions} from "../../../interfaces/IConverterOptions";

export class IntegerConverter implements IConverter {

    public convert(params: ValidationParams): Promise<any> | any {

        let value = typeof params.value === 'number' ? Math.round(params.value) : params.value;

        return value;
    }
}

registerConverter.extend({
    base: NumberSchema,
    name: "toInteger",
    converter: IntegerConverter
});

declare module '../numberSchema' {

    interface NumberSchema {
        toInteger(options?: IConverterOptions): this;
    }
}
