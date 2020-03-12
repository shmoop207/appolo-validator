"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConverter_1 = require("../../../schema/registerConverter");
const stringSchema_1 = require("../stringSchema");
class ReplaceConverter {
    convert(params) {
        let value = params.value, searchValue = params.args[0], replaceValue = params.args[1];
        return typeof value === 'string' ? value.replace(searchValue, replaceValue) : value;
    }
}
exports.ReplaceConverter = ReplaceConverter;
registerConverter_1.registerConverter.extend({
    base: stringSchema_1.StringSchema,
    name: "replace",
    converter: ReplaceConverter
});
//# sourceMappingURL=replaceConverter.js.map