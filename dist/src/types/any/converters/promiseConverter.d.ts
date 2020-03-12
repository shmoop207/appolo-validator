import { IConverter } from "../../../interfaces/IConverter";
import { ValidationParams } from "../../../interfaces/IConstraint";
import { IConverterOptions } from "../../../interfaces/IConverterOptions";
export declare class PromiseConverter implements IConverter {
    convert(params: ValidationParams): Promise<any>;
}
declare module '../anySchema' {
    interface AnySchema {
        await(options?: IConverterOptions): this;
    }
}
