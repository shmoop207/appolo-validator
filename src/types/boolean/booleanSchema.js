"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boolean = exports.BooleanSchema = void 0;
const anySchema_1 = require("../any/anySchema");
const registerSchema_1 = require("../../schema/registerSchema");
class BooleanSchema extends anySchema_1.AnySchema {
    constructor(options = {}) {
        super(options);
        this._type = "boolean";
    }
}
exports.BooleanSchema = BooleanSchema;
function boolean(options = {}) {
    let schema = registerSchema_1.registerSchema.extend({ type: BooleanSchema, options });
    return schema
        .isBoolean(options)
        .toBoolean(options, { runIf: (params) => params.validateOptions.convert });
}
exports.boolean = boolean;
//# sourceMappingURL=booleanSchema.js.map