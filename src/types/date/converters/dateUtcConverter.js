"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateConverter = void 0;
const registerConverter_1 = require("../../../schema/registerConverter");
const dateSchema_1 = require("../dateSchema");
class DateConverter {
    convert(params) {
        let value = params.value;
        if (!(value instanceof Date)) {
            return value;
        }
        let date = Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate(), value.getUTCHours(), value.getUTCMinutes(), value.getUTCSeconds());
        return new Date(date);
    }
}
exports.DateConverter = DateConverter;
registerConverter_1.registerConverter.extend({
    base: dateSchema_1.DateSchema,
    name: "toUtc",
    converter: DateConverter
});
//# sourceMappingURL=dateUtcConverter.js.map