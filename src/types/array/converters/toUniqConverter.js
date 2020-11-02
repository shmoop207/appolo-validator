"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToUniqConverter = void 0;
const registerConverter_1 = require("../../../schema/registerConverter");
const utils_1 = require("@appolo/utils");
const arraySchema_1 = require("../arraySchema");
class ToUniqConverter {
    convert(params) {
        if (!Array.isArray(params.value)) {
            return params.value;
        }
        let fn = params.args[0] || ((item) => item);
        let uniq = utils_1.Arrays.uniqBy(params.value, fn);
        return uniq;
    }
}
exports.ToUniqConverter = ToUniqConverter;
registerConverter_1.registerConverter.extend({
    base: arraySchema_1.ArraySchema,
    name: "toUniq",
    converter: ToUniqConverter
});
//# sourceMappingURL=toUniqConverter.js.map