"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const numberSchema_1 = require("../numberSchema");
class NegativeNumberConstraint {
    validate(params) {
        let options = params.options, value = params.value;
        return { isValid: value < 0 };
    }
    get type() {
        return "negative";
    }
    get defaultMessage() {
        return "${property} must be a negative number";
    }
}
exports.NegativeNumberConstraint = NegativeNumberConstraint;
registerConstraint_1.registerConstraint.extend({
    base: numberSchema_1.NumberSchema,
    name: "negative",
    constraint: NegativeNumberConstraint
});
//# sourceMappingURL=negativeNumberConstraint.js.map