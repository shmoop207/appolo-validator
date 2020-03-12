"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const numberSchema_1 = require("../numberSchema");
class PortNumberConstraint {
    validate(params) {
        let options = params.options, value = params.value;
        return { isValid: value >= 0 && value <= 65535 };
    }
    get type() {
        return "positive";
    }
    get defaultMessage() {
        return "${property} must be a valid port";
    }
}
exports.PortNumberConstraint = PortNumberConstraint;
registerConstraint_1.registerConstraint.extend({
    base: numberSchema_1.NumberSchema,
    name: "port",
    constraint: PortNumberConstraint
});
//# sourceMappingURL=portNumberConstraint.js.map