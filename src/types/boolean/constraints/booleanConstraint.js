"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const booleanSchema_1 = require("../booleanSchema");
class BooleanConstraint {
    validate(args) {
        let value = args.value;
        return { isValid: value === true || value === false };
    }
    get type() {
        return "boolean";
    }
    get defaultMessage() {
        return "${property} is not valid boolean";
    }
}
exports.BooleanConstraint = BooleanConstraint;
registerConstraint_1.registerConstraint.extend({
    base: booleanSchema_1.BooleanSchema,
    name: "isBoolean",
    constraint: BooleanConstraint
});
//# sourceMappingURL=booleanConstraint.js.map