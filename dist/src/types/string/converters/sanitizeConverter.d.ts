import { IConverter } from "../../../interfaces/IConverter";
import { ValidationParams } from "../../../interfaces/IConstraint";
import { IConverterOptions } from "../../../interfaces/IConverterOptions";
export declare class SanitizeConverter implements IConverter {
    convert(params: ValidationParams): Promise<any> | any;
}
declare module '../stringSchema' {
    interface StringSchema {
        sanitize(options?: IConverterOptions): this;
    }
}
