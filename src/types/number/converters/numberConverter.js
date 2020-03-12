"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numberSchema_1 = require("../numberSchema");
const registerConverter_1 = require("../../../schema/registerConverter");
class NumberConverter {
    convert(params) {
        return typeof params.value === 'string' ? parseFloat(params.value) : params.value;
    }
}
exports.NumberConverter = NumberConverter;
registerConverter_1.registerConverter.extend({
    base: numberSchema_1.NumberSchema,
    name: "toFloat",
    converter: NumberConverter
});
// declare module '../numberSchema' {
//
//     interface NumberSchema {
//         toFloat(options?: IConverterOptions): this;
//     }
// }
//# sourceMappingURL=numberConverter.js.map