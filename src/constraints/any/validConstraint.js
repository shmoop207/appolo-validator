"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../schema/registerConstraint");
const anySchema_1 = require("../../schema/types/anySchema");
class ValidConstraint {
    async validate(params) {
        let valid = params.args[0], value = params.value;
        if (!valid || !valid.length) {
            return { isValid: true };
        }
        for (let i = 0; i < valid.length; i++) {
            let validItem = valid[i];
            if (validItem === value || (isNaN(validItem) && isNaN(value))) {
                return { isValid: true };
            }
        }
        return { isValid: false };
    }
    get type() {
        return "equals";
    }
    defaultMessage(args) {
        return `${args.property || args.value} is not valid`;
    }
}
exports.ValidConstraint = ValidConstraint;
registerConstraint_1.registerConstraint.extend({
    base: anySchema_1.AnySchema,
    name: "valid",
    constraint: ValidConstraint,
    blackList: true
});
//# sourceMappingURL=validConstraint.js.map