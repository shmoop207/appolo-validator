"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = exports.StringSchema = void 0;
const anySchema_1 = require("../any/anySchema");
const registerSchema_1 = require("../../schema/registerSchema");
class StringSchema extends anySchema_1.AnySchema {
    constructor(options = {}) {
        super(options);
        this._type = "string";
    }
}
exports.StringSchema = StringSchema;
function string(options = {}) {
    let schema = registerSchema_1.registerSchema.extend({ type: StringSchema, options });
    return schema.isString(options);
}
exports.string = string;
//# sourceMappingURL=stringSchema.js.map