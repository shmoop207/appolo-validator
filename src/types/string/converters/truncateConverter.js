"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TruncateConverter = void 0;
const registerConverter_1 = require("../../../schema/registerConverter");
const stringSchema_1 = require("../stringSchema");
class TruncateConverter {
    convert(params) {
        let value = params.value, limit = params.args[0];
        if (!(typeof value === 'string')) {
            return value;
        }
        if (value.length <= limit) {
            return value;
        }
        return value.slice(0, limit) + '...';
    }
}
exports.TruncateConverter = TruncateConverter;
registerConverter_1.registerConverter.extend({
    base: stringSchema_1.StringSchema,
    name: "truncate",
    converter: TruncateConverter
});
//# sourceMappingURL=truncateConverter.js.map