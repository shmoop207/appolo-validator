"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class StringConstraint {
    validate(params) {
        let value = params.value;
        if (typeof params.value !== "string") {
            return { isValid: false };
        }
        return { isValid: true };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} is not valid string";
    }
}
exports.StringConstraint = StringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "isString",
    constraint: StringConstraint, blackList: true
});
//# sourceMappingURL=stringConstraint.js.map