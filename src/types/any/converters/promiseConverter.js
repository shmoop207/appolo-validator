"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_utils_1 = require("appolo-utils");
const registerConverter_1 = require("../../../schema/registerConverter");
const anySchema_1 = require("../anySchema");
class PromiseConverter {
    async convert(params) {
        let value = params.value;
        if (!appolo_utils_1.Promises.isPromise(value)) {
            return value;
        }
        try {
            let dto = await value;
            return dto;
        }
        catch (e) {
            return value;
        }
    }
}
exports.PromiseConverter = PromiseConverter;
registerConverter_1.registerConverter.extend({
    base: anySchema_1.AnySchema,
    name: "await",
    converter: PromiseConverter
});
//# sourceMappingURL=promiseConverter.js.map