import {ObjectSchema} from "../schema/types/objectSchema";
import {ReflectMetadata} from "appolo-utils";

export const SchemaSymbol = "__SchemaSymbol__";

export function schema(schema: ObjectSchema) {
    return function (target: any) {
        let result = ReflectMetadata.getNestedMetadata<{ schema?: ObjectSchema }>(SchemaSymbol, target.constructor, {});
        result.schema = schema
    }
}
