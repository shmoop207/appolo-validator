"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const arraySchema_1 = require("../arraySchema");
const utils_1 = require("@appolo/utils");
class UniqConstraint {
    validate(params) {
        let fn = params.args[0] || ((item) => item);
        let uniq = utils_1.Arrays.uniqBy(params.value, fn);
        return { isValid: uniq.length === params.value.length };
    }
    get type() {
        return "uniq";
    }
    get defaultMessage() {
        return "${property} array is not uniq";
    }
}
exports.UniqConstraint = UniqConstraint;
registerConstraint_1.registerConstraint.extend({
    base: arraySchema_1.ArraySchema,
    name: "uniq",
    constraint: UniqConstraint
});
//# sourceMappingURL=uniqConstraint.js.map