"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objectSchema_1 = require("../object/objectSchema");
const registerSchema_1 = require("../../schema/registerSchema");
class FunctionSchema extends objectSchema_1.ObjectSchema {
    constructor(options = {}) {
        super(options);
        this._type = "function";
    }
}
exports.FunctionSchema = FunctionSchema;
function func(options) {
    let schema = registerSchema_1.registerSchema.extend({ type: FunctionSchema, options });
    return schema.isFunction(options);
}
exports.func = func;
//# sourceMappingURL=functionSchema.js.map