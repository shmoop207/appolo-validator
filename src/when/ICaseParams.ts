import {AnySchema} from "../types/any/anySchema";
import {ValidationParams} from "../interfaces/IConstraint";

export interface ICaseParams {
    schema?: AnySchema,
    value?: any,
    fn?: (params: ValidationParams, value: any) => boolean,
    groups?: string[]
    thenSchema?: AnySchema
}
