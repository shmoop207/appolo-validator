"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const arraySchema_1 = require("../arraySchema");
class MinConstraint {
    validate(params) {
        let isValid = params.value.length >= params.args[0];
        return { isValid };
    }
    get type() {
        return "min";
    }
    get defaultMessage() {
        return "${property} has invalid min size";
    }
}
exports.MinConstraint = MinConstraint;
registerConstraint_1.registerConstraint.extend({
    base: arraySchema_1.ArraySchema,
    name: "min",
    constraint: MinConstraint
});
//# sourceMappingURL=minConstraint.js.map