"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anySchema_1 = require("../any/anySchema");
const registerSchema_1 = require("../../schema/registerSchema");
class ArraySchema extends anySchema_1.AnySchema {
    constructor(options = {}) {
        super(options);
        this._type = "array";
    }
}
exports.ArraySchema = ArraySchema;
function array(items, options) {
    let schema = registerSchema_1.registerSchema.extend({ type: ArraySchema, options });
    if (items) {
        schema.items(items);
    }
    return schema.isArray(options)
        .toJson({ runIf: (params) => params.validateOptions.convert });
}
exports.array = array;
//# sourceMappingURL=arraySchema.js.map