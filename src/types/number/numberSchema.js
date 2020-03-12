"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anySchema_1 = require("../any/anySchema");
const registerSchema_1 = require("../../schema/registerSchema");
class NumberSchema extends anySchema_1.AnySchema {
    constructor(options = {}) {
        super(options);
        this._type = "number";
    }
}
exports.NumberSchema = NumberSchema;
function number(options) {
    let schema = registerSchema_1.registerSchema.extend({ type: NumberSchema, options });
    return schema.float(options)
        .toFloat({ runIf: (params) => params.validateOptions.convert });
}
exports.number = number;
//# sourceMappingURL=numberSchema.js.map