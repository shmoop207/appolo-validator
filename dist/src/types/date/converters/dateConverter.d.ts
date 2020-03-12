import { IConverter } from "../../../interfaces/IConverter";
import { ValidationParams } from "../../../interfaces/IConstraint";
import { IConverterOptions } from "../../../interfaces/IConverterOptions";
export declare class DateConverter implements IConverter {
    convert(params: ValidationParams): Promise<any> | any;
    static convertValueToDate(value: Date | number | string, format?: string): Date;
    private static _parseNumber;
    private static _parseISO;
    private static _parseFormat;
}
declare module '../dateSchema' {
    interface DateSchema {
        format(format?: string, options?: IConverterOptions): this;
    }
}
