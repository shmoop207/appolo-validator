"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailStringConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class EmailStringConstraint {
    validate(params) {
        const value = params.value;
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return { isValid: typeof value == "string" && regex.test(value) };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} is not valid email string";
    }
}
exports.EmailStringConstraint = EmailStringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "email",
    constraint: EmailStringConstraint
});
//# sourceMappingURL=emailStringConstraint.js.map