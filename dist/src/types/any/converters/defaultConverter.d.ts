import { IConverter } from "../../../interfaces/IConverter";
import { ValidationParams } from "../../../interfaces/IConstraint";
import { IConverterOptions } from "../../../interfaces/IConverterOptions";
export declare class DefaultConverter implements IConverter {
    convert(params: ValidationParams): Promise<any> | any;
}
declare module '../anySchema' {
    interface AnySchema {
        default(value: any, options?: IConverterOptions): this;
    }
}
