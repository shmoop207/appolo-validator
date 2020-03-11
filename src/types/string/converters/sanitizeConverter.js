"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConverter_1 = require("../../../schema/registerConverter");
const stringSchema_1 = require("../stringSchema");
class SanitizeConverter {
    convert(params) {
        let value = params.value;
        let regex = new RegExp(`[\\x00-\\x1F\\x7F]+`, 'g');
        return typeof value === 'string' ? value.replace(regex, "") : value;
    }
}
exports.SanitizeConverter = SanitizeConverter;
registerConverter_1.registerConverter.extend({
    base: stringSchema_1.StringSchema,
    name: "sanitize",
    converter: SanitizeConverter
});
//# sourceMappingURL=sanitizeConverter.js.map