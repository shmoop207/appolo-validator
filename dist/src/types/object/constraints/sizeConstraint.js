"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const objectSchema_1 = require("../objectSchema");
class SizeConstraint {
    validate(params) {
        let isValid = Object.keys(params.value || {}).length == params.args[0];
        return { isValid };
    }
    get type() {
        return "Size";
    }
    get defaultMessage() {
        return "${property} has invalid keys size";
    }
}
exports.SizeConstraint = SizeConstraint;
registerConstraint_1.registerConstraint.extend({
    base: objectSchema_1.ObjectSchema,
    name: "size",
    constraint: SizeConstraint
});
//# sourceMappingURL=sizeConstraint.js.map