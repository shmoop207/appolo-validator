"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class MaxStringConstraint {
    validate(params) {
        const value = params.value;
        return { isValid: typeof value == "string" && value.length <= params.args[0] };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} length must be at most ${arg0}";
    }
}
exports.MaxStringConstraint = MaxStringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "max",
    constraint: MaxStringConstraint
});
//# sourceMappingURL=maxStringConstraint.js.map