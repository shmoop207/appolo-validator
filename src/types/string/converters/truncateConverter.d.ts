import { IConverter } from "../../../interfaces/IConverter";
import { ValidationParams } from "../../../interfaces/IConstraint";
import { IConverterOptions } from "../../../interfaces/IConverterOptions";
export declare class TruncateConverter implements IConverter {
    convert(params: ValidationParams): Promise<any> | any;
}
declare module '../stringSchema' {
    interface StringSchema {
        truncate(limit: number, options?: IConverterOptions): this;
    }
}
