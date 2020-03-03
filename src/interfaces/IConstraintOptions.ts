import {ValidationParams} from "./IConstraint";

export interface IConstraintOptions {
    message?: string

    runIf?: (params: ValidationParams) => boolean
}
