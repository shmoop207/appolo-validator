"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToSortConverter = void 0;
const registerConverter_1 = require("../../../schema/registerConverter");
const utils_1 = require("@appolo/utils");
const arraySchema_1 = require("../arraySchema");
class ToSortConverter {
    convert(params) {
        if (!Array.isArray(params.value)) {
            return params.value;
        }
        let fn = params.args[0] || ((item) => item);
        let uniq = utils_1.Arrays.sortBy(params.value, fn);
        return uniq;
    }
}
exports.ToSortConverter = ToSortConverter;
registerConverter_1.registerConverter.extend({
    base: arraySchema_1.ArraySchema,
    name: "toSort",
    converter: ToSortConverter
});
// declare module '../../../../index' {
//
//     interface ArraySchema {
//         toSort(fn?: ((item: any) => any), options?: IConverterOptions): this;
//     }
// }
//# sourceMappingURL=toSortConverter.js.map