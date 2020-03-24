import {IConverter} from "../../../interfaces/IConverter";
import {ValidationParams} from "../../../interfaces/IConstraint";
import {registerConverter} from "../../../schema/registerConverter";
import {IConverterOptions} from "../../../interfaces/IConverterOptions";
import {BufferSchema} from "../bufferSchema";

export class ToBufferConverterConverter implements IConverter {

    public convert(params: ValidationParams): Promise<any> | any {

        return Buffer.isBuffer(params.value)
            ? params.value
            : Buffer.from(params.value, params.args[0]);
    }
}

registerConverter.extend({
    base: BufferSchema,
    name: "toBuffer",
    converter: ToBufferConverterConverter
});
