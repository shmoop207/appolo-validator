import { IConverter } from "../../../interfaces/IConverter";
import { ValidationParams } from "../../../interfaces/IConstraint";
import { IConverterOptions } from "../../../interfaces/IConverterOptions";
export declare class ToSortConverter implements IConverter {
    convert(params: ValidationParams): Promise<any> | any;
}
declare module '../ArraySchema' {
    interface ArraySchema {
        toSort(fn?: ((item: any) => any), options?: IConverterOptions): this;
    }
}
