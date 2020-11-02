import {ValidationParams} from "../interfaces/IConstraint";
import {Classes} from "@appolo/utils";

export class Ref {
    constructor(private key: string | ((params: ValidationParams) => string | number)) {
    }

    public geValue(params: ValidationParams): any {

        let key = Classes.isFunction(this.key) ? (this.key as Function)(params) : this.key;

        return params.object[key];


    }
}

export function ref( key: string | ((params: ValidationParams) => string | number)) {
    return new Ref(key)
}
