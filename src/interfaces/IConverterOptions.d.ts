import { ValidationParams } from "./IConstraint";
export interface IConverterOptions {
    runIf?: (params: ValidationParams) => boolean;
}
