"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsObjectOrClassConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const objectSchema_1 = require("../objectSchema");
const utils_1 = require("@appolo/utils");
class IsObjectOrClassConstraint {
    validate(params) {
        let isValid = utils_1.Util.objects.isObject(params.value) || utils_1.Util.classes.isClass(params.value);
        return { isValid };
    }
    get type() {
        return "isObjectOrClass";
    }
    get defaultMessage() {
        return "${property} is not valid object";
    }
}
exports.IsObjectOrClassConstraint = IsObjectOrClassConstraint;
registerConstraint_1.registerConstraint.extend({
    base: objectSchema_1.ObjectSchema,
    name: "isObjectOrClass",
    constraint: IsObjectOrClassConstraint, blackList: true
});
//# sourceMappingURL=isObjectOrClassConstraint.js.map