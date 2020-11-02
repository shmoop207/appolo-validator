"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const bufferSchema_1 = require("../bufferSchema");
class MaxConstraint {
    validate(params) {
        let isValid = params.value.length <= params.args[0];
        return { isValid };
    }
    get type() {
        return "max";
    }
    get defaultMessage() {
        return "${property} contains more bytes then ${arg0}";
    }
}
exports.MaxConstraint = MaxConstraint;
registerConstraint_1.registerConstraint.extend({
    base: bufferSchema_1.BufferSchema,
    name: "max",
    constraint: MaxConstraint
});
//# sourceMappingURL=maxConstraint.js.map