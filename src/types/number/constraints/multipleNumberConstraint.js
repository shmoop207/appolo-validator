"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleNumberConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const numberSchema_1 = require("../numberSchema");
class MultipleNumberConstraint {
    validate(params) {
        let options = params.options, value = params.value;
        return { isValid: value % params.args[0] == 0 };
    }
    get type() {
        return "integer";
    }
    get defaultMessage() {
        return "${property} must be divided by the multiple ${arg0} ";
    }
}
exports.MultipleNumberConstraint = MultipleNumberConstraint;
registerConstraint_1.registerConstraint.extend({
    base: numberSchema_1.NumberSchema,
    name: "multiple",
    constraint: MultipleNumberConstraint
});
//# sourceMappingURL=multipleNumberConstraint.js.map