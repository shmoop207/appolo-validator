"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const functionSchema_1 = require("../functionSchema");
class FuncConstraint {
    validate(args) {
        let isValid = typeof args.value === "function";
        return { isValid };
    }
    get type() {
        return "isFunction";
    }
    get defaultMessage() {
        return "${property}  is not valid function";
    }
}
exports.FuncConstraint = FuncConstraint;
registerConstraint_1.registerConstraint.extend({
    base: functionSchema_1.FunctionSchema,
    name: "isFunction",
    constraint: FuncConstraint
});
//# sourceMappingURL=funcConstraint.js.map