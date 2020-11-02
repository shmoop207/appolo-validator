"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const arraySchema_1 = require("../arraySchema");
class ArrayConstraint {
    validate(args) {
        let isValid = Array.isArray(args.value);
        return { isValid };
    }
    get type() {
        return "array";
    }
    get defaultMessage() {
        return "${property} is not valid array";
    }
}
exports.ArrayConstraint = ArrayConstraint;
registerConstraint_1.registerConstraint.extend({
    base: arraySchema_1.ArraySchema,
    name: "isArray",
    constraint: ArrayConstraint, blackList: true
});
//# sourceMappingURL=arrayConstraint.js.map