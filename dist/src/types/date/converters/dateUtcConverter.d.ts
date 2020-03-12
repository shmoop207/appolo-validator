import { IConverter } from "../../../interfaces/IConverter";
import { ValidationParams } from "../../../interfaces/IConstraint";
import { IConverterOptions } from "../../../interfaces/IConverterOptions";
export declare class DateConverter implements IConverter {
    convert(params: ValidationParams): Promise<any> | any;
}
declare module '../dateSchema' {
    interface DateSchema {
        toUtc(options?: IConverterOptions): this;
    }
}
