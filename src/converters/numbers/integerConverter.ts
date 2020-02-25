import {IConverter} from "../IConverter";
import {ValidationParams} from "../../constraints/IConstraint";
import {NumberSchema} from "../../schema/types/numberSchema";
import {registerConverter} from "../../schema/registerConverter";
import {IConverterOptions} from "../../interfaces/IConverterOptions";

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

declare module '../../schema/types/numberSchema' {

    interface NumberSchema {
        toInteger(options?: IConverterOptions): this;
    }
}
