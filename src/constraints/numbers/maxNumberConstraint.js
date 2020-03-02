"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../registerConstraint");
const numberSchema_1 = require("../../schema/types/numberSchema");
class MaxNumberConstraint {
    async validate(params) {
        let options = params.options, value = params.value;
        return { isValid: value <= params.args[0] };
    }
    get type() {
        return "maxNumber";
    }
    defaultMessage(args) {
        return `${args.value} max that was expected for this number`;
    }
}
exports.MaxNumberConstraint = MaxNumberConstraint;
registerConstraint_1.registerConstraint.extend({
    base: numberSchema_1.NumberSchema,
    name: "max",
    constraint: MaxNumberConstraint
});
//# sourceMappingURL=maxNumberConstraint.js.map