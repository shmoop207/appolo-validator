"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPlainConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const objectSchema_1 = require("../objectSchema");
const utils_1 = require("@appolo/utils");
class IsPlainConstraint {
    validate(args) {
        let isValid = utils_1.Objects.isPlain(args.value);
        return { isValid };
    }
    get type() {
        return "isPlain";
    }
    get defaultMessage() {
        return "${property} is not valid object";
    }
}
exports.IsPlainConstraint = IsPlainConstraint;
registerConstraint_1.registerConstraint.extend({
    base: objectSchema_1.ObjectSchema,
    name: "isPlain",
    constraint: IsPlainConstraint
});
//# sourceMappingURL=isPlainConstraint.js.map