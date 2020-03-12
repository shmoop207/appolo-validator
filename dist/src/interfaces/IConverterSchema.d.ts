import { IConverterOptions } from "./IConverterOptions";
import { IConverterClass } from "./IConverter";
export interface IConverterSchema {
    converter: IConverterClass;
    options?: IConverterOptions;
    args?: any[];
}
