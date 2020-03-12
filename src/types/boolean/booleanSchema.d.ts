import { AnySchema } from "../any/anySchema";
import { IConstraintOptions } from "../../interfaces/IConstraintOptions";
import { ISchemaOptions } from "../../interfaces/IOptions";
export declare class BooleanSchema extends AnySchema {
    constructor(options?: IConstraintOptions);
}
export declare function boolean(options?: IConstraintOptions & ISchemaOptions & {
    truthy?: any[];
    falsy?: any[];
}): import("../../decorators/registerDecorator").DecoratorFn & BooleanSchema;
