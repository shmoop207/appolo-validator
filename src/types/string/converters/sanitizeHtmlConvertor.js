"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanitizeHtmlConvertor = void 0;
const stringSchema_1 = require("../stringSchema");
const registerConverter_1 = require("../../../schema/registerConverter");
class SanitizeHtmlConvertor {
    convert(params) {
        let value = params.value;
        const htmlTagPattern = /<([^>]+)>/gm;
        const replaceMap = {
            '<': '&lt;',
            '>': '&gt;'
        };
        let isHtml = htmlTagPattern.test(value);
        if (isHtml) {
            value = value.replace(/[<>]/g, (m) => {
                return replaceMap[m];
            });
        }
        return value;
    }
}
exports.SanitizeHtmlConvertor = SanitizeHtmlConvertor;
registerConverter_1.registerConverter.extend({
    base: stringSchema_1.StringSchema,
    name: "sanitizeHTML",
    converter: SanitizeHtmlConvertor
});
//# sourceMappingURL=sanitizeHtmlConvertor.js.map