"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numberSchema_1 = require("../numberSchema");
const registerConverter_1 = require("../../../schema/registerConverter");
const appolo_utils_1 = require("appolo-utils");
class PrecisionConverter {
    convert(params) {
        let value = typeof params.value === 'number'
            ? appolo_utils_1.Numbers.toFixed(params.value, params.args[0])
            : params.value;
        return value;
    }
}
exports.PrecisionConverter = PrecisionConverter;
registerConverter_1.registerConverter.extend({
    base: numberSchema_1.NumberSchema,
    name: "toPrecision",
    converter: PrecisionConverter
});
//# sourceMappingURL=precisionConverter.js.map