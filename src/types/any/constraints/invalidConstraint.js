"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const anySchema_1 = require("../anySchema");
class InvalidConstraint {
    validate(params) {
        let valid = params.args[0], value = params.value;
        if (!valid || !valid.length) {
            return { isValid: true };
        }
        for (let i = 0; i < valid.length; i++) {
            let validItem = valid[i];
            if (validItem === value) {
                return { isValid: false };
            }
        }
        return { isValid: true };
    }
    get type() {
        return "invalid";
    }
    get defaultMessage() {
        return "${property} has invalid values";
    }
}
exports.InvalidConstraint = InvalidConstraint;
registerConstraint_1.registerConstraint.extend({
    base: anySchema_1.AnySchema,
    name: "invalid",
    constraint: InvalidConstraint,
    blackList: true
});
//# sourceMappingURL=invalidConstraint.js.map