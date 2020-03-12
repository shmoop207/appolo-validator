import { AnySchema } from "../any/anySchema";
import { IConstraintOptions } from "../../interfaces/IConstraintOptions";
import { Schema } from "../../schema/registerSchema";
import { IClass } from "appolo-engine/index";
export declare class ArraySchema extends AnySchema {
    constructor(options?: IConstraintOptions);
}
export declare function array(items?: Schema | Schema[] | IClass | IClass[], options?: IConstraintOptions): import("../../decorators/registerDecorator").DecoratorFn & ArraySchema;
