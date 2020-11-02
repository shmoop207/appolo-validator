"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceOfConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const objectSchema_1 = require("../objectSchema");
class InstanceOfConstraint {
    validate(params) {
        let isValid = params.value instanceof params.args[0];
        return { isValid };
    }
    get type() {
        return "isPlain";
    }
    get defaultMessage() {
        return "${property} is not instanceof";
    }
}
exports.InstanceOfConstraint = InstanceOfConstraint;
registerConstraint_1.registerConstraint.extend({
    base: objectSchema_1.ObjectSchema,
    name: "instanceOf",
    constraint: InstanceOfConstraint
});
//# sourceMappingURL=instanceOfConstraint.js.map