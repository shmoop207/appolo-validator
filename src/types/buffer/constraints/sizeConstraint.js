"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const bufferSchema_1 = require("../bufferSchema");
class SizeConstraint {
    validate(params) {
        let isValid = params.value.length == params.args[0];
        return { isValid };
    }
    get type() {
        return "size";
    }
    get defaultMessage() {
        return "${property} buffer has invalid length";
    }
}
exports.SizeConstraint = SizeConstraint;
registerConstraint_1.registerConstraint.extend({
    base: bufferSchema_1.BufferSchema,
    name: "size",
    constraint: SizeConstraint
});
//# sourceMappingURL=sizeConstraint.js.map