"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const arraySchema_1 = require("../arraySchema");
class MaxConstraint {
    validate(params) {
        let isValid = params.value.length <= params.args[0];
        return { isValid };
    }
    get type() {
        return "max";
    }
    get defaultMessage() {
        return "${property} has invalid max size";
    }
}
exports.MaxConstraint = MaxConstraint;
registerConstraint_1.registerConstraint.extend({
    base: arraySchema_1.ArraySchema,
    name: "max",
    constraint: MaxConstraint
});
//# sourceMappingURL=maxConstraint.js.map