"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class StringConstraint {
    async validate(args) {
        let options = args.options, value = args.value;
        if (typeof args.value !== "string") {
            return { isValid: false };
        }
        return { isValid: true };
    }
    get type() {
        return "string";
    }
    defaultMessage(args) {
        return `${args.value} is not a string`;
    }
}
exports.StringConstraint = StringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "isString",
    constraint: StringConstraint
});
//# sourceMappingURL=stringConstraint.js.map