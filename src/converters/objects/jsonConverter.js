"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConverter_1 = require("../../schema/registerConverter");
const objectSchema_1 = require("../../schema/types/objectSchema");
const index_1 = require("appolo-utils/index");
class JsonConverter {
    convert(params) {
        let value = params.value;
        return typeof value === 'string' ? index_1.Util.objects.tryParseJSON(value) || value : value;
    }
}
exports.JsonConverter = JsonConverter;
registerConverter_1.registerConverter.extend({
    base: objectSchema_1.ObjectSchema,
    name: "toJson",
    converter: JsonConverter
});
//# sourceMappingURL=jsonConverter.js.map