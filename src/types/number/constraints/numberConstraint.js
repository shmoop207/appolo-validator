"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const numberSchema_1 = require("../numberSchema");
class NumberConstraint {
    async validate(args) {
        let options = args.options, value = args.value;
        if (typeof args.value !== "number") {
            return { isValid: false };
        }
        return { isValid: Number.isFinite(value) };
    }
    get type() {
        return "number";
    }
    get defaultMessage() {
        return "${property} must be a number";
    }
}
exports.NumberConstraint = NumberConstraint;
registerConstraint_1.registerConstraint.extend({
    base: numberSchema_1.NumberSchema,
    name: "float",
    constraint: NumberConstraint, blackList: true
});
//# sourceMappingURL=numberConstraint.js.map