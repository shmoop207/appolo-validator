"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class UpperCaseStringConstraint {
    validate(params) {
        let value = params.value;
        return { isValid: typeof value == "string" && params.value.toUpperCase() === params.value };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} is not valid upperCase string";
    }
}
exports.UpperCaseStringConstraint = UpperCaseStringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "uppercase",
    constraint: UpperCaseStringConstraint
});
//# sourceMappingURL=upperCaseStringConstraint.js.map