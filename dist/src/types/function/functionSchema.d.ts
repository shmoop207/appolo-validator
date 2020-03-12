import { IConstraintOptions } from "../../interfaces/IConstraintOptions";
import { ObjectSchema } from "../object/objectSchema";
export declare class FunctionSchema extends ObjectSchema {
    constructor(options?: IConstraintOptions);
}
export declare function func(options?: IConstraintOptions): import("../../decorators/registerDecorator").DecoratorFn & FunctionSchema;
