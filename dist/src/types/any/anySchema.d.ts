import { ISchemaOptions } from "../../interfaces/IOptions";
import { IConstraintSchema } from "../../interfaces/IConstraintSchema";
import { IConstraintOptions } from "../../interfaces/IConstraintOptions";
import { IConverterSchema } from "../../interfaces/IConverterSchema";
import { IContextSchema } from "../../interfaces/IContext";
export declare class AnySchema {
    private _options;
    private readonly _constraints;
    private readonly _converters;
    private readonly _contexts;
    protected _type: string;
    protected _context: {
        [index: string]: any;
    };
    constructor(options?: IConstraintOptions);
    get context(): {
        [index: string]: any;
    };
    get constraints(): IConstraintSchema[];
    get converters(): IConverterSchema[];
    get contexts(): IContextSchema[];
    options(options: ISchemaOptions): this;
    getContext(name: string): any;
    setContext(name: string, value: any): this;
    getOptions(): ISchemaOptions;
    addConstraint(schema: IConstraintSchema): AnySchema;
    addConverter(schema: IConverterSchema, top?: boolean): AnySchema;
    addContext(schema: IContextSchema, top?: boolean): AnySchema;
}
export declare function any(options?: IConstraintOptions): Pick<import("../../decorators/registerDecorator").DecoratorFn & AnySchema, "required" | "optional" | "default" | "invalid" | "allow" | "options" | "setContext" | "or" | "and" | "forbidden" | "valid" | "await" | "if">;
