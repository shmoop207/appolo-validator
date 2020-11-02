"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStringConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class JwtStringConstraint {
    validate(args) {
        let value = args.value;
        let regex = /^([A-Za-z0-9\-_~+\/]+[=]{0,2})\.([A-Za-z0-9\-_~+\/]+[=]{0,2})(?:\.([A-Za-z0-9\-_~+\/]+[=]{0,2}))?$/;
        return { isValid: typeof value == "string" && regex.test(value) };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} is not valid jwt string";
    }
}
exports.JwtStringConstraint = JwtStringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "jwt",
    constraint: JwtStringConstraint
});
//# sourceMappingURL=jwtStringConstraint.js.map