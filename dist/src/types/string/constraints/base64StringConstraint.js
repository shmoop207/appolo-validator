"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class Base64StringConstraint {
    validate(params) {
        const value = params.value;
        const len = value.length;
        if (!len || len % 4 !== 0 || /[^A-Z0-9+\/=]/i.test(value)) {
            return { isValid: false };
        }
        const firstPaddingChar = value.indexOf('=');
        let isValid = firstPaddingChar === -1 ||
            firstPaddingChar === len - 1 ||
            (firstPaddingChar === len - 2 && value[len - 1] === '=');
        return { isValid };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} is not valid base64 string";
    }
}
exports.Base64StringConstraint = Base64StringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "base64",
    constraint: Base64StringConstraint
});
//# sourceMappingURL=base64StringConstraint.js.map