"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const functionSchema_1 = require("../functionSchema");
class ArgsSizeConstraint {
    validate(params) {
        let isValid = params.value.length == params.args[0];
        return { isValid };
    }
    get type() {
        return "ArgsSize";
    }
    get defaultMessage() {
        return "${property} has invalid arguments size";
    }
}
exports.ArgsSizeConstraint = ArgsSizeConstraint;
registerConstraint_1.registerConstraint.extend({
    base: functionSchema_1.FunctionSchema,
    name: "argsSize",
    constraint: ArgsSizeConstraint
});
//# sourceMappingURL=argsSizeConstraint.js.map