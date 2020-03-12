import { IConverter } from "../../../interfaces/IConverter";
import { ValidationParams } from "../../../interfaces/IConstraint";
import { IConverterOptions } from "../../../interfaces/IConverterOptions";
export declare class ToUniqConverter implements IConverter {
    convert(params: ValidationParams): Promise<any> | any;
}
declare module '../ArraySchema' {
    interface ArraySchema {
        toUniq(fn?: ((item: any, index?: number) => any), options?: IConverterOptions): this;
    }
}
