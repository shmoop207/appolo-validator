"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    schema.isDate(options);
    return schema;
}
exports.date = date;
//# sourceMappingURL=dateSchema.js.map