"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const anySchema_1 = require("../anySchema");
class ForbiddenConstraint {
    validate(params) {
        let value = params.value;
        return { isValid: value === undefined };
    }
    get type() {
        return "forbidden";
    }
    get defaultMessage() {
        return "${property} is forbidden";
    }
}
exports.ForbiddenConstraint = ForbiddenConstraint;
registerConstraint_1.registerConstraint.extend({
    base: anySchema_1.AnySchema,
    name: "forbidden",
    constraint: ForbiddenConstraint,
    blackList: true
});
//# sourceMappingURL=forbiddenConstraint.js.map