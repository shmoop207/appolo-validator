"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositiveNumberConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const numberSchema_1 = require("../numberSchema");
class PositiveNumberConstraint {
    validate(params) {
        let options = params.options, value = params.value;
        return { isValid: value > 0 };
    }
    get type() {
        return "positive";
    }
    get defaultMessage() {
        return "${property} must be a positive number";
    }
}
exports.PositiveNumberConstraint = PositiveNumberConstraint;
registerConstraint_1.registerConstraint.extend({
    base: numberSchema_1.NumberSchema,
    name: "positive",
    constraint: PositiveNumberConstraint
});
//# sourceMappingURL=positiveNumberConstraint.js.map