"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const anySchema_1 = require("../anySchema");
class AllowConstraint {
    validate(params) {
        let allowed = params.args[0], value = params.value;
        if (!allowed || !allowed.length) {
            return { isValid: true };
        }
        for (let i = 0; i < allowed.length; i++) {
            let allowedItem = allowed[i];
            if (allowedItem === value || (Number.isNaN(allowedItem) && Number.isNaN(value))) {
                return { isValid: true };
            }
        }
        return { isValid: false };
    }
    get type() {
        return "allow";
    }
    get defaultMessage() {
        return "";
    }
}
exports.AllowConstraint = AllowConstraint;
registerConstraint_1.registerConstraint.extend({
    base: anySchema_1.AnySchema,
    name: "allow",
    constraint: AllowConstraint,
    whiteList: true
});
//# sourceMappingURL=allowConstraint.js.map