"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const anySchema_1 = require("../anySchema");
class OptionalConstraint {
    validate(params) {
        let value = params.value;
        return { isValid: value === undefined };
    }
    get type() {
        return "optional";
    }
    get defaultMessage() {
        return "";
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