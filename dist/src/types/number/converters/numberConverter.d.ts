import { IConverter } from "../../../interfaces/IConverter";
import { ValidationParams } from "../../../interfaces/IConstraint";
import { IConverterOptions } from "../../../interfaces/IConverterOptions";
export declare class NumberConverter implements IConverter {
    convert(params: ValidationParams): Promise<any> | any;
}
declare module '../numberSchema' {
    interface NumberSchema {
        toFloat(options?: IConverterOptions): this;
    }
}
