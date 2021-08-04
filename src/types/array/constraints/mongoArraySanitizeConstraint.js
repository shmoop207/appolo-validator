"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoArraySanitizeConstraint = void 0;
const utils_1 = require("@appolo/utils");
const registerConstraint_1 = require("../../../schema/registerConstraint");
const arraySchema_1 = require("../arraySchema");
class MongoArraySanitizeConstraint {
    validate(params) {
        let value = params.value, isValid = true;
        let str = utils_1.Util.objects.tryStringifyJSON(value);
        if (str.includes("$where")) {
            isValid = false;
        }
        return { isValid };
    }
    get type() {
        return "with";
    }
    get defaultMessage() {
        return "${property} has invalid keys";
    }
}
exports.MongoArraySanitizeConstraint = MongoArraySanitizeConstraint;
registerConstraint_1.registerConstraint.extend({
    base: arraySchema_1.ArraySchema,
    name: "mongoSanitize",
    constraint: MongoArraySanitizeConstraint
});
//# sourceMappingURL=mongoArraySanitizeConstraint.js.map