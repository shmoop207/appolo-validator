"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConverter_1 = require("../../../schema/registerConverter");
const appolo_utils_1 = require("appolo-utils");
const stringSchema_1 = require("../stringSchema");
class DecodeConverter {
    convert(params) {
        let value = params.value;
        return typeof value === 'string' ? appolo_utils_1.Strings.tryDecodeURIComponent(value) : value;
    }
}
exports.DecodeConverter = DecodeConverter;
registerConverter_1.registerConverter.extend({
    base: stringSchema_1.StringSchema,
    name: "decode",
    converter: DecodeConverter
});
//# sourceMappingURL=decodeConverter.js.map