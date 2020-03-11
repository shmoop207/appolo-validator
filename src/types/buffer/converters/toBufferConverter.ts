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

declare module '../bufferSchema' {

    interface BufferSchema {
        toBuffer(encoding: "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex", options?: IConverterOptions): this;
    }
}
