import { AnySchema } from "../types/any/anySchema";
import { Schema } from "../schema/registerSchema";
export declare type DecoratorFn = (target: any, propertyKey: string, descriptor?: PropertyDescriptor | number) => void;
export declare const PropertySymbol = "__PropertySymbol__";
export declare const SchemaFnSymbol = "@schema";
export declare class RegisterDecorator {
    extend<T extends Schema>(params: {
        schema: AnySchema;
    }): DecoratorFn & T;
}
export declare const registerDecorator: RegisterDecorator;
