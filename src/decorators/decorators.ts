import {ObjectSchema} from "../types/object/objectSchema";
import {Reflector} from "@appolo/utils";

export const SchemaSymbol = "__SchemaSymbol__";

export function schema(schema: ObjectSchema) {
    return function (target: any) {
        let result = Reflector.getMetadata<{ schema?: ObjectSchema }>(SchemaSymbol, target.constructor, undefined, {});
        result.schema = schema
    }
}
