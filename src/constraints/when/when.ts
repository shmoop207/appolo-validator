import {ValidationParams} from "../IConstraint";
import {AnySchema} from "../../schema/types/anySchema";
import {ICaseParams} from "./ICaseParams";
import {IWhenParams} from "./IWhenParams";
import {Ref} from "../../schema/types/ref";

export class When {

    protected _params: IWhenParams = {cases: []};

    private _case: ICaseParams;

    constructor(prop?: Ref | ((params: ValidationParams) => any)) {
        this._params.prop = prop;
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

    public value(value: any): this {
        this._getCase().value = value;
        return this;
    }

    public fn(value: ((params: ValidationParams) => boolean)): this {
        this._getCase().fn = value;
        return this;
    }

    public group(group: string | string[]): this {

        if (typeof group == "string") {
            group = [group]
        }

        this._getCase().groups = group;

        return this;
    }

    public schema(schema: AnySchema): this {

        this._getCase().schema = schema;

        return this;
    }

    public then(schema: AnySchema): this {
        this._getCase().then = schema;
        return this;
    }


    public case(when: When): this {
        if (when.params.cases.length) {
            this._params.cases.push(when.params.cases[0]);
        }

        return this;
    }

    public otherwise(schema: AnySchema): this {
        this._params.otherwise = schema;
        return this;
    }

}

export function when(prop?: Ref | ((params: ValidationParams) => any)) {
    return new When(prop);
}

