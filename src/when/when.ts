import {ValidationParams} from "../interfaces/IConstraint";
import {AnySchema} from "../types/any/anySchema";
import {ICaseParams} from "./ICaseParams";
import {IWhenParams} from "./IWhenParams";
import {Ref} from "../schema/ref";
import {ReflectMetadata} from "appolo-utils/index";
import {DecoratorFn, PropertySymbol, SchemaFnSymbol} from "../decorators/registerDecorator";

export class When implements Pick<When, "ref"> {

    protected _params: IWhenParams = {cases: []};

    private _case: ICaseParams;

    constructor(prop?: Ref | ((params: ValidationParams) => any) | string) {
        this._params.prop = typeof prop === "string" ? new Ref(prop) : prop as Ref;
    }

    public property(prop: string): Pick<this, "schema" | "value" | "fn" | "group" | "is"> {
        this._params.prop = new Ref(prop);
        return this
    }

    public ref(ref: string | ((params: ValidationParams) => string | number)): Pick<this, "schema" | "value" | "fn" | "group" | "is"> {
        this._params.prop = new Ref(ref);
        return this;
    }

    public refFn(fn: ((params: ValidationParams) => any)): Pick<this, "schema" | "value" | "fn" | "group" | "is"> {
        this._params.prop = fn;
        return this;
    }

    public get is(): Pick<this, "schema" | "value" | "fn" | "group"> {
        return this;
    }


    public get params() {
        return this._params;
    }

    private _getCase(): ICaseParams {
        if (!this._case) {
            this._case = {};
            this._params.cases.push(this._case);
        }

        return this._case;
    }

    public value(value: any): Pick<When, "then" | "case"> {
        this._getCase().value = value;
        return this;
    }

    public fn(value: ((params: ValidationParams) => boolean)): Pick<When, "then" | "case"> {
        this._getCase().fn = value;
        return this;
    }

    public group(group: string | string[]): Pick<When, "then" | "case"> {

        if (typeof group == "string") {
            group = [group]
        }

        this._getCase().groups = group;

        return this;
    }

    public schema(schema: AnySchema): Pick<When, "then" | "case"> {

        this._getCase().schema = schema;

        return this;
    }

    public then(schema: AnySchema): Pick<When, "else"> {
        this._getCase().thenSchema = schema;
        return this;
    }


    public case(when: Pick<When, any>): Pick<When, "default" | "case"> {
        if (when.params.cases.length) {
            this._params.cases.push(when.params.cases[0]);
        }

        return this;
    }

    public else(schema: AnySchema): Pick<this, "else"> {
        this._params.otherwise = schema;
        return this
    }

    public default(schema: AnySchema): Pick<this, "default"> {
        this._params.otherwise = schema;
        return this
    }

}

export const SchemaFnWhen = "__SchemaFnWhen__";

export function when(prop?: Ref | ((params: ValidationParams) => any)): DecoratorFn & Omit<When, "default" | "else" | "then"> {

    let when = new When(prop);
    let fn = function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let validations = ReflectMetadata.getNestedMetadata<{ [index: string]: When }>(PropertySymbol, target, {});
        validations[propertyKey] = when;
    };

    fn[SchemaFnWhen] = when;

    let fnNames = ["default", "else", "case", "then", "schema", "group", "fn", "value", "refFn", "ref", "property"];

    for (let i = 0; i < fnNames.length; i++) {
        let fnName = fnNames[i];
        fn[fnName] = function () {
            let when = fn[SchemaFnWhen];
            when[fnName].apply(when, arguments);
            return fn;
        }
    }

    Object.defineProperty(fn, "params", {
        get: function () {
            return when.params;
        }
    });

    Object.defineProperty(fn, "is", {
        get: function () {
            return fn;
        }
    });


    return fn as any;
}

