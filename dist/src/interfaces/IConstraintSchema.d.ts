import { IConstraintClass } from "./IConstraint";
import { IConstraintOptions } from "./IConstraintOptions";
export interface IConstraintSchema {
    constraint: IConstraintClass;
    options?: IConstraintOptions;
    args?: any[];
    whiteList?: boolean;
    blackList?: boolean;
}
