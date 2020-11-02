"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsObjectConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const objectSchema_1 = require("../objectSchema");
const utils_1 = require("@appolo/utils");
class IsObjectConstraint {
    validate(params) {
        let isValid = utils_1.Util.objects.isObject(params.value);
        return { isValid };
    }
    get type() {
        return "isObject";
    }
    get defaultMessage() {
        return "${property} is not valid object";
    }
}
exports.IsObjectConstraint = IsObjectConstraint;
registerConstraint_1.registerConstraint.extend({
    base: objectSchema_1.ObjectSchema,
    name: "isObject",
    constraint: IsObjectConstraint
});
//# sourceMappingURL=isObjectConstraint.js.map