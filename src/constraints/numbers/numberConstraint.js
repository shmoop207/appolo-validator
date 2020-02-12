"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    defaultMessage(args) {
        return `${args.value} is not a number`;
    }
}
exports.NumberConstraint = NumberConstraint;
//# sourceMappingURL=numberConstraint.js.map