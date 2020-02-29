"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_utils_1 = require("appolo-utils");
exports.SchemaSymbol = "__SchemaSymbol__";
function schema(schema) {
    return function (target) {
        let result = appolo_utils_1.ReflectMetadata.getNestedMetadata(exports.SchemaSymbol, target.constructor, {});
        result.schema = schema;
    };
}
exports.schema = schema;
//# sourceMappingURL=decorators.js.map