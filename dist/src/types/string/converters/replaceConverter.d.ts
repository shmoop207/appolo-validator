import { IConverter } from "../../../interfaces/IConverter";
import { ValidationParams } from "../../../interfaces/IConstraint";
import { IConverterOptions } from "../../../interfaces/IConverterOptions";
export declare class ReplaceConverter implements IConverter {
    convert(params: ValidationParams): Promise<any> | any;
}
declare module '../stringSchema' {
    interface StringSchema {
        replace(searchValue: string | RegExp, replaceValue: string, options?: IConverterOptions): this;
    }
}
