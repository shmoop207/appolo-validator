import { IConverter } from "../../../interfaces/IConverter";
import { ValidationParams } from "../../../interfaces/IConstraint";
import { IConverterOptions } from "../../../interfaces/IConverterOptions";
export declare class DecodeConverter implements IConverter {
    convert(params: ValidationParams): Promise<any> | any;
}
declare module '../stringSchema' {
    interface StringSchema {
        decode(options?: IConverterOptions): this;
    }
}
