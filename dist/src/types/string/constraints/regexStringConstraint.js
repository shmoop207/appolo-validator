"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class UuidStringConstraint {
    validate(params) {
        const value = params.value;
        return { isValid: typeof value == "string" && params.args[0].test(value) };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} do not match regex";
    }
}
exports.UuidStringConstraint = UuidStringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "regex",
    constraint: UuidStringConstraint
});
//# sourceMappingURL=regexStringConstraint.js.map