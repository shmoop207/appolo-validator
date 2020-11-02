"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinKeysConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const objectSchema_1 = require("../objectSchema");
class MinKeysConstraint {
    validate(params) {
        let isValid = Object.keys(params.value || {}).length >= params.args[0];
        return { isValid };
    }
    get type() {
        return "MinKeys";
    }
    get defaultMessage() {
        return "${property} has invalid min keys size";
    }
}
exports.MinKeysConstraint = MinKeysConstraint;
registerConstraint_1.registerConstraint.extend({
    base: objectSchema_1.ObjectSchema,
    name: "minKeys",
    constraint: MinKeysConstraint
});
//# sourceMappingURL=minKeysConstraint.js.map