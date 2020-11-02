"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.date = exports.DateSchema = void 0;
const anySchema_1 = require("../any/anySchema");
const registerSchema_1 = require("../../schema/registerSchema");
class DateSchema extends anySchema_1.AnySchema {
    constructor(options = {}) {
        super(options);
        this._type = "date";
    }
}
exports.DateSchema = DateSchema;
function date(options = {}) {
    let schema = registerSchema_1.registerSchema.extend({ type: DateSchema, options });
    return schema.isDate(options);
}
exports.date = date;
//# sourceMappingURL=dateSchema.js.map