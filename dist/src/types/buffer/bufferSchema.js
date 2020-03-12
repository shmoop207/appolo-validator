"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anySchema_1 = require("../any/anySchema");
const registerSchema_1 = require("../../schema/registerSchema");
class BufferSchema extends anySchema_1.AnySchema {
    constructor(options = {}) {
        super(options);
        this._type = "buffer";
    }
}
exports.BufferSchema = BufferSchema;
function buffer(options = {}) {
    let schema = registerSchema_1.registerSchema.extend({ type: BufferSchema, options });
    return schema.isBuffer(options);
}
exports.buffer = buffer;
//# sourceMappingURL=bufferSchema.js.map