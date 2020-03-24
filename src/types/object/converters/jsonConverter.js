"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConverter_1 = require("../../../schema/registerConverter");
const objectSchema_1 = require("../objectSchema");
const appolo_utils_1 = require("appolo-utils");
const arraySchema_1 = require("../../array/arraySchema");
class JsonConverter {
    convert(params) {
        let value = params.value;
        return typeof value === 'string' ? appolo_utils_1.Util.objects.tryParseJSON(value) || value : value;
    }
}
exports.JsonConverter = JsonConverter;
registerConverter_1.registerConverter.extend({
    base: objectSchema_1.ObjectSchema,
    name: "toJson",
    converter: JsonConverter
});
registerConverter_1.registerConverter.extend({
    base: arraySchema_1.ArraySchema,
    name: "toJson",
    converter: JsonConverter
});
// declare module '../../../../index' {
//
//     interface ArraySchema {
//         toJson(options?: IConverterOptions): this;
//     }
// }
//# sourceMappingURL=jsonConverter.js.map