import { IConverter } from "../../../interfaces/IConverter";
import { ValidationParams } from "../../../interfaces/IConstraint";
import { IConverterOptions } from "../../../interfaces/IConverterOptions";
export declare class SlugifyConverter implements IConverter {
    convert(params: ValidationParams): Promise<any> | any;
}
declare module '../stringSchema' {
    interface StringSchema {
        slugify(options?: IConverterOptions): this;
    }
}
