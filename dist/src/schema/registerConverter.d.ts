import { AnySchema } from "../types/any/anySchema";
import { IConverterClass } from "../interfaces/IConverter";
interface IExtendParams {
    name: string;
    converter: IConverterClass;
    base: typeof AnySchema;
}
export declare class RegisterConverter {
    private _converters;
    extend(params: IExtendParams): void;
    get converters(): Map<typeof AnySchema, IExtendParams[]>;
}
export declare const registerConverter: RegisterConverter;
export {};
