"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class AlphanumStringConstraint {
    validate(args) {
        let value = args.value;
        return { isValid: typeof value == "string" && new RegExp("^[a-zA-Z0-9]+$").test(value) };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} is not valid alpha numeric string";
    }
}
exports.AlphanumStringConstraint = AlphanumStringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "alphanum",
    constraint: AlphanumStringConstraint
});
//# sourceMappingURL=alphanumStringConstraint.js.map