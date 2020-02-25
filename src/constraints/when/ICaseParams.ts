import {AnySchema} from "../../schema/types/anySchema";
import {ValidationParams} from "../IConstraint";

export interface ICaseParams {
    schema?: AnySchema,
    value?: any,
    fn?: (params: ValidationParams) => boolean,
    groups?: string[]
    then?: AnySchema
}
