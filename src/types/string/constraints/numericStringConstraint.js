"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumericStringConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class NumericStringConstraint {
    validate(params) {
        const value = params.value;
        return { isValid: typeof value == "string" && new RegExp("^[+-]?([0-9]*[.])?[0-9]+$").test(value) };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} is not valid numeric string";
    }
}
exports.NumericStringConstraint = NumericStringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "numeric",
    constraint: NumericStringConstraint
});
//# sourceMappingURL=numericStringConstraint.js.map