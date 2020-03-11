"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const functionSchema_1 = require("../functionSchema");
class MinArgsConstraint {
    validate(params) {
        let isValid = params.value.length >= params.args[0];
        return { isValid };
    }
    get type() {
        return "MinArgs";
    }
    get defaultMessage() {
        return "${property} args is under min args size";
    }
}
exports.MinArgsConstraint = MinArgsConstraint;
registerConstraint_1.registerConstraint.extend({
    base: functionSchema_1.FunctionSchema,
    name: "minArgs",
    constraint: MinArgsConstraint
});
//# sourceMappingURL=minArgsConstraint.js.map