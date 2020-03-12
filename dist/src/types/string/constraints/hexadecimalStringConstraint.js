"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class HexadecimalStringConstraint {
    validate(args) {
        let value = args.value;
        return { isValid: typeof value == "string" && /^(0x|0h)?[0-9A-F]+$/i.test(value) };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} is not valid hexadecimal string";
    }
}
exports.HexadecimalStringConstraint = HexadecimalStringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "hexadecimal",
    constraint: HexadecimalStringConstraint
});
//# sourceMappingURL=hexadecimalStringConstraint.js.map