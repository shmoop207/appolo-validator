"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const objectSchema_1 = require("../objectSchema");
class MaxKeysConstraint {
    validate(params) {
        let isValid = Object.keys(params.value || {}).length <= params.args[0];
        return { isValid };
    }
    get type() {
        return "MaxKeys";
    }
    get defaultMessage() {
        return "${property} has invalid max keys size";
    }
}
exports.MaxKeysConstraint = MaxKeysConstraint;
registerConstraint_1.registerConstraint.extend({
    base: objectSchema_1.ObjectSchema,
    name: "maxKeys",
    constraint: MaxKeysConstraint
});
//# sourceMappingURL=maxKeysConstraint.js.map