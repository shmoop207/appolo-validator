"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegerNumberConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const numberSchema_1 = require("../numberSchema");
class IntegerNumberConstraint {
    validate(params) {
        let options = params.options, value = params.value;
        return { isValid: Number.isInteger(value) };
    }
    get type() {
        return "integer";
    }
    get defaultMessage() {
        return "${property} must be an integer number";
    }
}
exports.IntegerNumberConstraint = IntegerNumberConstraint;
registerConstraint_1.registerConstraint.extend({
    base: numberSchema_1.NumberSchema,
    name: "integer",
    constraint: IntegerNumberConstraint
});
//# sourceMappingURL=integerNumberConstraint.js.map