import {AnySchema} from "../../schema/types/anySchema";
import {ICaseParams} from "./ICaseParams";
import {ValidationParams} from "../IConstraint";
import {Ref} from "../../schema/types/ref";

export interface IWhenParams {
    prop?: Ref | ((params:ValidationParams)=>any),
    cases: ICaseParams[],
    otherwise?: AnySchema;

}
