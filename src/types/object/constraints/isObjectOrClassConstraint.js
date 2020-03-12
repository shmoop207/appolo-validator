"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const objectSchema_1 = require("../objectSchema");
const appolo_utils_1 = require("appolo-utils");
class IsObjectOrClassConstraint {
    validate(params) {
        let isValid = appolo_utils_1.Util.objects.isObject(params.value) || appolo_utils_1.Util.classes.isClass(params.value);
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
    constraint: IsObjectOrClassConstraint
});
//# sourceMappingURL=isObjectOrClassConstraint.js.map