import {IConverter} from "../../../interfaces/IConverter";
import {ValidationParams} from "../../../interfaces/IConstraint";
import {registerConverter} from "../../../schema/registerConverter";
import {IConverterOptions} from "../../../interfaces/IConverterOptions";
import {ArraySchema} from "../../array/arraySchema";
import {StringSchema} from "../stringSchema";

export class TrimConverter implements IConverter {

    public convert(params: ValidationParams): Promise<any> | any {
        let value: string = params.value;
        return typeof value === 'string' ? value.trim() : value
    }
}

registerConverter.extend({
    base: StringSchema,
    name: "trim",
    converter: TrimConverter
});


