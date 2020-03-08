"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const numberSchema_1 = require("../numberSchema");
class MinNumberConstraint {
    async validate(params) {
        let options = params.options, value = params.value;
        return { isValid: value >= params.args[0] };
    }
    get type() {
        return "minNumber";
    }
    get defaultMessage() {
        return "${property} must be larger than ${arg0}";
    }
}
exports.MinNumberConstraint = MinNumberConstraint;
registerConstraint_1.registerConstraint.extend({
    base: numberSchema_1.NumberSchema,
    name: "min",
    constraint: MinNumberConstraint
});
//# sourceMappingURL=minNumberConstraint.js.map