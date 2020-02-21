"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../schema/registerConstraint");
const numberSchema_1 = require("../../schema/types/numberSchema");
class MinNumberConstraint {
    async validate(params) {
        let options = params.options, value = params.value;
        return { isValid: value >= params.args[0] };
    }
    get type() {
        return "minNumber";
    }
    defaultMessage(args) {
        return `${args.value} min that was expected for this number`;
    }
}
exports.MinNumberConstraint = MinNumberConstraint;
registerConstraint_1.registerConstraint.extend({
    base: numberSchema_1.NumberSchema,
    name: "min",
    constraint: MinNumberConstraint
});
//# sourceMappingURL=minNumberConstraint.js.map