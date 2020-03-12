"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class ContainsStringConstraint {
    validate(params) {
        const value = params.value;
        return { isValid: typeof value == "string" && value.indexOf(params.args[0]) > -1 };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} dose not contain ${arg0}";
    }
}
exports.ContainsStringConstraint = ContainsStringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "contains",
    constraint: ContainsStringConstraint
});
//# sourceMappingURL=containsStringConstraint.js.map