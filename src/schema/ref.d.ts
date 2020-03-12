import { ValidationParams } from "../interfaces/IConstraint";
export declare class Ref {
    private key;
    constructor(key: string | ((params: ValidationParams) => string | number));
    geValue(params: ValidationParams): any;
}
export declare function ref(key: string | ((params: ValidationParams) => string | number)): Ref;
