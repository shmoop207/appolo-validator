"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConverter_1 = require("../../../schema/registerConverter");
const dateSchema_1 = require("../dateSchema");
const date_fns_1 = require("date-fns");
class DateConverter {
    convert(params) {
        let format = params.args[0], value = params.value;
        return DateConverter.convertValueToDate(value, format) || value;
    }
    static convertValueToDate(value, format) {
        if (value instanceof Date) {
            return value;
        }
        return this._parseFormat(format, value) || this._parseISO(value) || this._parseNumber(value);
    }
    static _parseNumber(value) {
        if (typeof value !== "number") {
            return null;
        }
        let date = date_fns_1.toDate(value);
        return date_fns_1.isValid(date) ? date : null;
    }
    static _parseISO(value) {
        if (typeof value !== 'string') {
            return null;
        }
        let date = date_fns_1.parseISO(value);
        return date_fns_1.isValid(date) ? date : (date_fns_1.isValid((date = date_fns_1.parseJSON(value))) ? date : null);
    }
    static _parseFormat(format, value) {
        if (!format) {
            return null;
        }
        let date = date_fns_1.parse((value || "").toString(), format, new Date());
        return date_fns_1.isValid(date) ? date : null;
    }
}
exports.DateConverter = DateConverter;
registerConverter_1.registerConverter.extend({
    base: dateSchema_1.DateSchema,
    name: "format",
    converter: DateConverter
});
//# sourceMappingURL=dateConverter.js.map