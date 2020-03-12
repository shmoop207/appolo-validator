import { IConverter } from "../../../interfaces/IConverter";
import { ValidationParams } from "../../../interfaces/IConstraint";
import { IConverterOptions } from "../../../interfaces/IConverterOptions";
export declare class ToBufferConverterConverter implements IConverter {
    convert(params: ValidationParams): Promise<any> | any;
}
declare module '../bufferSchema' {
    interface BufferSchema {
        toBuffer(encoding: "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex", options?: IConverterOptions): this;
    }
}
