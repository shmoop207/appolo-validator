"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonStringConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class JsonStringConstraint {
    validate(params) {
        let value = params.value;
        return { isValid: typeof value == "string" && /^(0x|0h)?[0-9A-F]+$/i.test(value) && value.length === 24 };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} is not valid mongo id";
    }
}
exports.JsonStringConstraint = JsonStringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "mongoId",
    constraint: JsonStringConstraint
});
//# sourceMappingURL=mongoIdStringConstraint.js.map