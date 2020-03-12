"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class SizeStringConstraint {
    validate(params) {
        const value = params.value;
        return { isValid: typeof value == "string" && value.length == params.args[0] };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} must be of size ${arg0}";
    }
}
exports.SizeStringConstraint = SizeStringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "size",
    constraint: SizeStringConstraint
});
//# sourceMappingURL=sizeStringConstraint.js.map