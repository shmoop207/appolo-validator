import { ValidationParams } from "./IConstraint";
export interface IContext {
    addContext(validationArguments: ValidationParams): Promise<any> | any;
}
export interface IContextClass {
    new (): IContext;
}
export interface IContextSchema {
    context: IContextClass;
    args?: any[];
}
