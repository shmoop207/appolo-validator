"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const bufferSchema_1 = require("../bufferSchema");
class MinConstraint {
    validate(params) {
        let isValid = params.value.length >= params.args[0];
        return { isValid };
    }
    get type() {
        return "min";
    }
    get defaultMessage() {
        return "${property} contains less bytes then ${arg0}";
    }
}
exports.MinConstraint = MinConstraint;
registerConstraint_1.registerConstraint.extend({
    base: bufferSchema_1.BufferSchema,
    name: "min",
    constraint: MinConstraint
});
//# sourceMappingURL=minConstraint.js.map