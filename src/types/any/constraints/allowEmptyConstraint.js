"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const anySchema_1 = require("../anySchema");
const allowConstraint_1 = require("./allowConstraint");
class AllowEmptyConstraint {
    validate(params) {
        let allowed = ['', null], value = params.value;
        if (!allowed || !allowed.length) {
            return { isValid: true };
        }
        for (let i = 0; i < allowed.length; i++) {
            let allowedItem = allowed[i];
            if (allowedItem === value) {
                return { isValid: true };
            }
        }
        return { isValid: false };
    }
    get type() {
        return "allowEmpty";
    }
    get defaultMessage() {
        return "";
    }
}
exports.AllowEmptyConstraint = AllowEmptyConstraint;
registerConstraint_1.registerConstraint.extend({
    base: anySchema_1.AnySchema,
    name: "allowEmpty",
    constraint: allowConstraint_1.AllowConstraint,
    whiteList: true
});
//# sourceMappingURL=allowEmptyConstraint.js.map