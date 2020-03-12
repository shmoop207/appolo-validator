import { ObjectSchema } from "../types/object/objectSchema";
export declare const SchemaSymbol = "__SchemaSymbol__";
export declare function schema(schema: ObjectSchema): (target: any) => void;
