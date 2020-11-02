"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const arraySchema_1 = require("../arraySchema");
class SizeConstraint {
    validate(params) {
        let isValid = params.value.length == params.args[0];
        return { isValid };
    }
    get type() {
        return "Size";
    }
    get defaultMessage() {
        return "${property} has invalid size";
    }
}
exports.SizeConstraint = SizeConstraint;
registerConstraint_1.registerConstraint.extend({
    base: arraySchema_1.ArraySchema,
    name: "size",
    constraint: SizeConstraint
});
//# sourceMappingURL=sizeConstraint.js.map