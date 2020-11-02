"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainStringConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class DomainStringConstraint {
    validate(params) {
        const value = params.value;
        let regex = /^(?!\-)(?:[a-zA-Z\d\-]{0,62}[a-zA-Z\d]\.){1,126}(?!\d+)[a-zA-Z\d]{1,63}$/;
        return { isValid: typeof value == "string" && regex.test(value) };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} is not valid domain string";
    }
}
exports.DomainStringConstraint = DomainStringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "domain",
    constraint: DomainStringConstraint
});
//# sourceMappingURL=domainStringConstraint.js.map