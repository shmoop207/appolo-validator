import { IConverter } from "../../../interfaces/IConverter";
import { ValidationParams } from "../../../interfaces/IConstraint";
import { IConverterOptions } from "../../../interfaces/IConverterOptions";
export declare class JsonConverter implements IConverter {
    convert(params: ValidationParams): Promise<any> | any;
}
declare module '../objectSchema' {
    interface ObjectSchema {
        toJson(options?: IConverterOptions): this;
    }
}
declare module '../../array/arraySchema' {
    interface ArraySchema {
        toJson(options?: IConverterOptions): this;
    }
}
