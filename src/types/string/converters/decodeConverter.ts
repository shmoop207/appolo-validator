import {IConverter} from "../../../interfaces/IConverter";
import {ValidationParams} from "../../../interfaces/IConstraint";
import {registerConverter} from "../../../schema/registerConverter";
import {IConverterOptions} from "../../../interfaces/IConverterOptions";
import {Strings} from "appolo-utils";
import {ArraySchema} from "../../array/arraySchema";
import {StringSchema} from "../stringSchema";

export class DecodeConverter implements IConverter {

    public convert(params: ValidationParams): Promise<any> | any {
        let value: string = params.value;
        return typeof value === 'string' ? Strings.tryDecodeURIComponent(value) : value
    }
}

registerConverter.extend({
    base: StringSchema,
    name: "decode",
    converter: DecodeConverter
});





