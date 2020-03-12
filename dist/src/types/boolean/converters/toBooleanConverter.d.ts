import { IConverter } from "../../../interfaces/IConverter";
import { ValidationParams } from "../../../interfaces/IConstraint";
import { IConverterOptions } from "../../../interfaces/IConverterOptions";
export declare class ToBooleanConverter implements IConverter {
    convert(params: ValidationParams): Promise<any> | any;
}
declare module '../booleanSchema' {
    interface BooleanSchema {
        toBoolean(opts: {
            truthy?: any[];
            falsy?: any[];
        }, options?: IConverterOptions): this;
    }
}
