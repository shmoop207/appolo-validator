"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const objectSchema_1 = require("../objectSchema");
const appolo_utils_1 = require("appolo-utils");
class WithoutConstraint {
    validate(params) {
        let key = params.args[0];
        let peers = appolo_utils_1.Arrays.arrayify(params.args[1]);
        if (params.value[key] === undefined) {
            return { isValid: true };
        }
        for (let i = 0; i < peers.length; i++) {
            if (params.value[peers[i]] !== undefined) {
                return { isValid: false };
            }
        }
        return { isValid: true };
    }
    get type() {
        return "without";
    }
    get defaultMessage() {
        return "${property} has invalid keys";
    }
}
exports.WithoutConstraint = WithoutConstraint;
registerConstraint_1.registerConstraint.extend({
    base: objectSchema_1.ObjectSchema,
    name: "without",
    constraint: WithoutConstraint
});
//# sourceMappingURL=withoutConstraint.js.map