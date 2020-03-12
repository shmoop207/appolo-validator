"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const numberSchema_1 = require("../numberSchema");
class MaxNumberConstraint {
    validate(params) {
        let options = params.options, value = params.value;
        return { isValid: value <= params.args[0] };
    }
    get type() {
        return "maxNumber";
    }
    get defaultMessage() {
        return "${property} must be smaller than ${arg0}";
    }
}
exports.MaxNumberConstraint = MaxNumberConstraint;
registerConstraint_1.registerConstraint.extend({
    base: numberSchema_1.NumberSchema,
    name: "max",
    constraint: MaxNumberConstraint
});
//# sourceMappingURL=maxNumberConstraint.js.map