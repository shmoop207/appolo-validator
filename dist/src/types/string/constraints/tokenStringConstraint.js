"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class TokenStringConstraint {
    validate(params) {
        const value = params.value;
        let regex = /^[a-zA-Z0-9_\-]+$/;
        return { isValid: typeof value == "string" && regex.test(value) };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} is not valid token string";
    }
}
exports.TokenStringConstraint = TokenStringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "token",
    constraint: TokenStringConstraint
});
//# sourceMappingURL=tokenStringConstraint.js.map