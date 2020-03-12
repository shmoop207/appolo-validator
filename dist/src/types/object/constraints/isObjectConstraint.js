"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const objectSchema_1 = require("../objectSchema");
class IsObjectConstraint {
    validate(params) {
        let isValid = typeof params.value === "object";
        return { isValid };
    }
    get type() {
        return "isObject";
    }
    get defaultMessage() {
        return "${property} is not valid object";
    }
}
exports.IsObjectConstraint = IsObjectConstraint;
registerConstraint_1.registerConstraint.extend({
    base: objectSchema_1.ObjectSchema,
    name: "isObject",
    constraint: IsObjectConstraint
});
//# sourceMappingURL=isObjectConstraint.js.map