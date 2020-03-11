"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
const net = require("net");
class IpStringConstraint {
    validate(params) {
        const value = params.value;
        return { isValid: typeof value == "string" && net.isIP(value) != 0 };
    }
    get type() {
        return "ip";
    }
    get defaultMessage() {
        return "${property} is not valid ip string";
    }
}
exports.IpStringConstraint = IpStringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "ip",
    constraint: IpStringConstraint
});
//# sourceMappingURL=ipStringConstraint.js.map