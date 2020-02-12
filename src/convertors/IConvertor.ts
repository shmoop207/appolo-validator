import {ValidationParams} from "../constraints/IConstraint";

export interface IConvertor {
    convert(validationArguments: ValidationParams): Promise<any> | any
}
