import {IConstraintClass} from "../constraints/IConstraint";
import {IConstraintOptions} from "./IConstraintOptions";

export interface IConstraintSchema {
    constraint: IConstraintClass
    options?: IConstraintOptions
    args?: any[]
    whiteList?: boolean
    blackList?:boolean
}
