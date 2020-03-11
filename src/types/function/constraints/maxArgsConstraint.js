"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const functionSchema_1 = require("../functionSchema");
class MaxArgsConstraint {
    validate(params) {
        let isValid = params.value.length <= params.args[0];
        return { isValid };
    }
    get type() {
        return "MaxArgs";
    }
    get defaultMessage() {
        return "${property} args is over max args size";
    }
}
exports.MaxArgsConstraint = MaxArgsConstraint;
registerConstraint_1.registerConstraint.extend({
    base: functionSchema_1.FunctionSchema,
    name: "maxArgs",
    constraint: MaxArgsConstraint
});
//# sourceMappingURL=maxArgsConstraint.js.map