import { AnySchema } from "../any/anySchema";
import { IConstraintOptions } from "../../interfaces/IConstraintOptions";
import { IClass } from "appolo-engine/index";
import { When } from "../../when/when";
export declare class ObjectSchema extends AnySchema {
    constructor(options?: IConstraintOptions);
}
export declare function object(keys?: IClass | {
    [index: string]: AnySchema | Pick<When, any>;
}, options?: IConstraintOptions): import("../../decorators/registerDecorator").DecoratorFn & ObjectSchema;
