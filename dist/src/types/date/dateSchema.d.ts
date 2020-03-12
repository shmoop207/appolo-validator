import { AnySchema } from "../any/anySchema";
import { IConstraintOptions } from "../../interfaces/IConstraintOptions";
import { ISchemaOptions } from "../../interfaces/IOptions";
export declare class DateSchema extends AnySchema {
    constructor(options?: IConstraintOptions);
}
export declare function date(options?: IConstraintOptions & ISchemaOptions): import("../../decorators/registerDecorator").DecoratorFn & DateSchema;
