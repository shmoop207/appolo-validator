import { AnySchema } from "../types/any/anySchema";
import { ICaseParams } from "./ICaseParams";
import { ValidationParams } from "../interfaces/IConstraint";
import { Ref } from "../schema/ref";
export interface IWhenParams {
    prop?: Ref | ((params: ValidationParams) => any);
    cases: ICaseParams[];
    otherwise?: AnySchema;
}
