import {ValidationParams} from "./IConstraint";

export interface IConstraintOptions {
    message?: string
    groups?: string[]
    runIf?: (params: ValidationParams) => boolean
}
