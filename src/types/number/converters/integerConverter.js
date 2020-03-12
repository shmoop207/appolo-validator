"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numberSchema_1 = require("../numberSchema");
const registerConverter_1 = require("../../../schema/registerConverter");
class IntegerConverter {
    convert(params) {
        let value = typeof params.value === 'number' ? Math.round(params.value) : params.value;
        return value;
    }
}
exports.IntegerConverter = IntegerConverter;
registerConverter_1.registerConverter.extend({
    base: numberSchema_1.NumberSchema,
    name: "toInteger",
    converter: IntegerConverter
});
// declare module '../numberSchema' {
//
//     interface NumberSchema {
//         toInteger(options?: IConverterOptions): this;
//     }
// }
//# sourceMappingURL=integerConverter.js.map