import { AnySchema } from "../types/any/anySchema";
import { DecoratorFn } from "../decorators/registerDecorator";
import { IConstraintOptions } from "../interfaces/IConstraintOptions";
interface IExtendParams {
    type: typeof AnySchema;
    options: IConstraintOptions;
}
declare type Omited = "context" | "constraints" | "converters" | "contexts" | "getContext" | "getOptions" | "addConstraint" | "addConverter" | "addContext";
export declare type Schema = Omit<AnySchema, Omited>;
export declare class RegisterSchema {
    extend<T extends Schema>(params: IExtendParams): Omit<DecoratorFn & T, Omited>;
}
export declare const registerSchema: RegisterSchema;
export {};
