import { AnySchema } from "../any/anySchema";
import { IConstraintOptions } from "../../interfaces/IConstraintOptions";
import { ISchemaOptions } from "../../interfaces/IOptions";
export declare class StringSchema extends AnySchema {
    constructor(options?: IConstraintOptions);
}
export declare function string(options?: IConstraintOptions & ISchemaOptions): import("../../decorators/registerDecorator").DecoratorFn & StringSchema;
