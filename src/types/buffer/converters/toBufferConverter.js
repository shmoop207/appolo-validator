"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToBufferConverterConverter = void 0;
const registerConverter_1 = require("../../../schema/registerConverter");
const bufferSchema_1 = require("../bufferSchema");
class ToBufferConverterConverter {
    convert(params) {
        return Buffer.isBuffer(params.value)
            ? params.value
            : Buffer.from(params.value, params.args[0]);
    }
}
exports.ToBufferConverterConverter = ToBufferConverterConverter;
registerConverter_1.registerConverter.extend({
    base: bufferSchema_1.BufferSchema,
    name: "toBuffer",
    converter: ToBufferConverterConverter
});
//# sourceMappingURL=toBufferConverter.js.map