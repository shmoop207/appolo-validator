"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const objectSchema_1 = require("../objectSchema");
const utils_1 = require("@appolo/utils");
class WithConstraint {
    validate(params) {
        let key = params.args[0];
        let peers = utils_1.Arrays.arrayify(params.args[1]);
        if (params.value[key] === undefined) {
            return { isValid: true };
        }
        for (let i = 0; i < peers.length; i++) {
            if (params.value[peers[i]] === undefined) {
                return { isValid: false };
            }
        }
        return { isValid: true };
    }
    get type() {
        return "with";
    }
    get defaultMessage() {
        return "${property} has invalid keys";
    }
}
exports.WithConstraint = WithConstraint;
registerConstraint_1.registerConstraint.extend({
    base: objectSchema_1.ObjectSchema,
    name: "with",
    constraint: WithConstraint
});
//# sourceMappingURL=withConstraint.js.map