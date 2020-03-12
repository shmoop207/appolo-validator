import { AnySchema } from "../types/any/anySchema";
import { IContextClass } from "../interfaces/IContext";
interface IExtendParams {
    name: string;
    context: IContextClass;
    base: typeof AnySchema;
}
export declare class RegisterContext {
    private _contexts;
    extend(params: IExtendParams): void;
    get contexts(): Map<typeof AnySchema, IExtendParams[]>;
}
export declare const registerContext: RegisterContext;
export {};
