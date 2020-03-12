import { AnySchema } from "../any/anySchema";
import { IConstraintOptions } from "../../interfaces/IConstraintOptions";
export declare class NumberSchema extends AnySchema {
    constructor(options?: IConstraintOptions);
}
export declare function number(options?: IConstraintOptions): import("../../decorators/registerDecorator").DecoratorFn & NumberSchema;
