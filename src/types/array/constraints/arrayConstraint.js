"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const arraySchema_1 = require("../arraySchema");
class ArrayConstraint {
    async validate(args) {
        let isValid = Array.isArray(args.value);
        return { isValid };
    }
    get type() {
        return "array";
    }
    defaultMessage(args) {
        return `value is not a valid array`;
    }
}
exports.ArrayConstraint = ArrayConstraint;
registerConstraint_1.registerConstraint.extend({
    base: arraySchema_1.ArraySchema,
    name: "isArray",
    constraint: ArrayConstraint
});
//# sourceMappingURL=arrayConstraint.js.map