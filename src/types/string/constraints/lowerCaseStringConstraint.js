"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LowerCaseStringConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class LowerCaseStringConstraint {
    validate(args) {
        let value = args.value;
        return { isValid: typeof value == "string" && args.value.toLowerCase() === args.value };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} is not valid lowerCase string";
    }
}
exports.LowerCaseStringConstraint = LowerCaseStringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "lowercase",
    constraint: LowerCaseStringConstraint
});
//# sourceMappingURL=lowerCaseStringConstraint.js.map