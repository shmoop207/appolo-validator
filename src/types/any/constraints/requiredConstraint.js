"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const anySchema_1 = require("../anySchema");
class RequiredConstraint {
    async validate(params) {
        let value = params.value;
        return { isValid: value !== undefined };
    }
    get type() {
        return "required";
    }
    defaultMessage(args) {
        return `${args.property || args.value} is required`;
    }
}
exports.RequiredConstraint = RequiredConstraint;
registerConstraint_1.registerConstraint.extend({
    base: anySchema_1.AnySchema,
    name: "required",
    constraint: RequiredConstraint,
    blackList: true
});
//# sourceMappingURL=requiredConstraint.js.map