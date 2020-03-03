"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const anySchema_1 = require("../anySchema");
class OptionalConstraint {
    async validate(params) {
        let value = params.value;
        return { isValid: value === undefined };
    }
    get type() {
        return "optional";
    }
    defaultMessage(args) {
        return `${args.property || args.value} is required`;
    }
}
exports.OptionalConstraint = OptionalConstraint;
registerConstraint_1.registerConstraint.extend({
    base: anySchema_1.AnySchema,
    name: "optional",
    constraint: OptionalConstraint,
    whiteList: true
});
//# sourceMappingURL=optionalConstraint.js.map