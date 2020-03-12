"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConverter_1 = require("../../../schema/registerConverter");
const stringSchema_1 = require("../stringSchema");
class TrimConverter {
    convert(params) {
        let value = params.value;
        return typeof value === 'string' ? value.trim() : value;
    }
}
exports.TrimConverter = TrimConverter;
registerConverter_1.registerConverter.extend({
    base: stringSchema_1.StringSchema,
    name: "trim",
    converter: TrimConverter
});
//# sourceMappingURL=trimConverter.js.map