"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlugifyConverter = void 0;
const registerConverter_1 = require("../../../schema/registerConverter");
const stringSchema_1 = require("../stringSchema");
class SlugifyConverter {
    convert(params) {
        let value = params.value;
        if (typeof value !== 'string') {
            return value;
        }
        return value.toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, '');
    }
}
exports.SlugifyConverter = SlugifyConverter;
registerConverter_1.registerConverter.extend({
    base: stringSchema_1.StringSchema,
    name: "slugify",
    converter: SlugifyConverter
});
//# sourceMappingURL=slugifyConverter.js.map