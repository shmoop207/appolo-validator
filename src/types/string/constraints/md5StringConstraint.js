"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Md5StringConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class Md5StringConstraint {
    validate(params) {
        const value = params.value;
        return { isValid: typeof value == "string" && new RegExp("^[a-f0-9]{32}$").test(value) };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} is not valid md5 string";
    }
}
exports.Md5StringConstraint = Md5StringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "md5",
    constraint: Md5StringConstraint
});
//# sourceMappingURL=md5StringConstraint.js.map