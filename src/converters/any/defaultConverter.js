"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConverter_1 = require("../registerConverter");
const anySchema_1 = require("../../schema/types/anySchema");
class DefaultConverter {
    convert(params) {
        let value = params.value, defaultValue = params.args[0];
        return typeof value === "undefined" ? defaultValue : value;
    }
}
exports.DefaultConverter = DefaultConverter;
registerConverter_1.registerConverter.extend({
    base: anySchema_1.AnySchema,
    name: "default",
    converter: DefaultConverter
});
//# sourceMappingURL=defaultConverter.js.map