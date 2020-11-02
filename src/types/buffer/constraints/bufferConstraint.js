"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const bufferSchema_1 = require("../bufferSchema");
class BufferConstraint {
    validate(args) {
        let options = args.options, value = args.value;
        return { isValid: Buffer.isBuffer(value) };
        return { isValid: true };
    }
    get type() {
        return "buffer";
    }
    get defaultMessage() {
        return "${property} is not valid buffer";
    }
}
exports.BufferConstraint = BufferConstraint;
registerConstraint_1.registerConstraint.extend({
    base: bufferSchema_1.BufferSchema,
    name: "isBuffer",
    constraint: BufferConstraint
});
//# sourceMappingURL=bufferConstraint.js.map