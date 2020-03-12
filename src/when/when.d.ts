import { ValidationParams } from "../interfaces/IConstraint";
import { AnySchema } from "../types/any/anySchema";
import { IWhenParams } from "./IWhenParams";
import { Ref } from "../schema/ref";
import { DecoratorFn } from "../decorators/registerDecorator";
export declare class When implements Pick<When, "ref"> {
    protected _params: IWhenParams;
    private _case;
    constructor(prop?: Ref | ((params: ValidationParams) => any) | string);
    property(prop: string): Pick<this, "schema" | "value" | "fn" | "group" | "is">;
    ref(ref: string | ((params: ValidationParams) => string | number)): Pick<this, "schema" | "value" | "fn" | "group" | "is">;
    refFn(fn: ((params: ValidationParams) => any)): Pick<this, "schema" | "value" | "fn" | "group" | "is">;
    get is(): Pick<this, "schema" | "value" | "fn" | "group">;
    get params(): IWhenParams;
    private _getCase;
    value(value: any): Pick<When, "then" | "case">;
    fn(value: ((params: ValidationParams) => boolean)): Pick<When, "then" | "case">;
    group(group: string | string[]): Pick<When, "then" | "case">;
    schema(schema: AnySchema): Pick<When, "then" | "case">;
    then(schema: AnySchema): Pick<When, "else">;
    case(when: Pick<When, any>): Pick<When, "default" | "case">;
    else(schema: AnySchema): Pick<this, "else">;
    default(schema: AnySchema): Pick<this, "default">;
}
export declare const SchemaFnWhen = "__SchemaFnWhen__";
export declare function when(prop?: Ref | ((params: ValidationParams) => any)): DecoratorFn & Omit<When, "default" | "else" | "then">;
