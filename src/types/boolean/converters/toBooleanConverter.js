"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToBooleanConverter = void 0;
const registerConverter_1 = require("../../../schema/registerConverter");
const booleanSchema_1 = require("../booleanSchema");
class ToBooleanConverter {
    convert(params) {
        let value = params.value;
        if (value === true || value === false) {
            return value;
        }
        let opts = params.args[0] || {};
        let trueValues = ["true", 1, "1"].concat(opts.truthy || []), falseValues = ["false", 0, "0"].concat(opts.falsy || []);
        if (trueValues.indexOf(value) > -1) {
            return true;
        }
        if (falseValues.indexOf(value) > -1) {
            return false;
        }
        return value;
    }
}
exports.ToBooleanConverter = ToBooleanConverter;
registerConverter_1.registerConverter.extend({
    base: booleanSchema_1.BooleanSchema,
    name: "toBoolean",
    converter: ToBooleanConverter
});
//# sourceMappingURL=toBooleanConverter.js.map