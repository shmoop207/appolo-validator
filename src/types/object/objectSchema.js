"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anySchema_1 = require("../any/anySchema");
const registerSchema_1 = require("../../schema/registerSchema");
class ObjectSchema extends anySchema_1.AnySchema {
    constructor(options = {}) {
        super(options);
        this._type = "object";
    }
}
exports.ObjectSchema = ObjectSchema;
function object(keys, options) {
    let schema = registerSchema_1.registerSchema.extend({ type: ObjectSchema, options });
    schema
        .toJson({ runIf: (params) => params.validateOptions.convert });
    if (keys) {
        schema.keys(keys);
    }
    return schema.isObject(options);
}
exports.object = object;
//# sourceMappingURL=objectSchema.js.map