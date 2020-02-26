"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringConstraint {
    async validate(args) {
        let options = args.options, value = args.value;
        if (typeof args.value !== "string") {
            return { isValid: false };
        }
        return { isValid: true };
    }
    get type() {
        return "string";
    }
    defaultMessage(args) {
        return `${args.value} is not a string`;
    }
}
exports.StringConstraint = StringConstraint;
//# sourceMappingURL=stringConstraint.js.map