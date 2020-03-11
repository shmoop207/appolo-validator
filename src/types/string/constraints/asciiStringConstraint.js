"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class AsciiStringConstraint {
    validate(args) {
        let value = args.value;
        return { isValid: typeof value == "string" && new RegExp("^[\x00-\x7F]+$").test(value) };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} is not valid ascii string";
    }
}
exports.AsciiStringConstraint = AsciiStringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "ascii",
    constraint: AsciiStringConstraint
});
//# sourceMappingURL=asciiStringConstraint.js.map