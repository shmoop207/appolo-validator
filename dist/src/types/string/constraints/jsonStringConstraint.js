"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
const appolo_utils_1 = require("appolo-utils");
class JsonStringConstraint {
    validate(params) {
        let value = params.value;
        if (typeof value != "string") {
            return { isValid: false };
        }
        let obj = appolo_utils_1.Objects.tryParseJSON(value);
        return { isValid: !!obj && typeof obj === 'object' };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} is not valid json string";
    }
}
exports.JsonStringConstraint = JsonStringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "json",
    constraint: JsonStringConstraint
});
//# sourceMappingURL=jsonStringConstraint.js.map