"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("appolo-utils/index");
const registerConstraint_1 = require("../../../schema/registerConstraint");
const functionSchema_1 = require("../functionSchema");
class IsClassConstraint {
    validate(args) {
        let isValid = index_1.Classes.isClass(args.value);
        return { isValid };
    }
    get type() {
        return "isClass";
    }
    get defaultMessage() {
        return "${property} is not valid class";
    }
}
exports.IsClassConstraint = IsClassConstraint;
registerConstraint_1.registerConstraint.extend({
    base: functionSchema_1.FunctionSchema,
    name: "isClass",
    constraint: IsClassConstraint
});
//# sourceMappingURL=isClassConstraint.js.map