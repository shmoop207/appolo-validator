import { AnySchema } from "../any/anySchema";
import { IConstraintOptions } from "../../interfaces/IConstraintOptions";
import { ISchemaOptions } from "../../interfaces/IOptions";
export declare class BufferSchema extends AnySchema {
    constructor(options?: IConstraintOptions);
}
export declare function buffer(options?: IConstraintOptions & ISchemaOptions): import("../../decorators/registerDecorator").DecoratorFn & BufferSchema;
