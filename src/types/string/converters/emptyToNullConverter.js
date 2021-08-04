"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyToNullConverter = void 0;
const registerConverter_1 = require("../../../schema/registerConverter");
const stringSchema_1 = require("../stringSchema");
class EmptyToNullConverter {
    convert(params) {
        let value = params.value;
        return value === "" ? null : value;
    }
}
exports.EmptyToNullConverter = EmptyToNullConverter;
registerConverter_1.registerConverter.extend({
    base: stringSchema_1.StringSchema,
    name: "emptyToNull",
    converter: EmptyToNullConverter
});
//# sourceMappingURL=emptyToNullConverter.js.map