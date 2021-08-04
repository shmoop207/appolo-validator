"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoObjectSanitizeConstraint = void 0;
const objectSchema_1 = require("../objectSchema");
const utils_1 = require("@appolo/utils");
const registerConstraint_1 = require("../../../schema/registerConstraint");
class MongoObjectSanitizeConstraint {
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
exports.MongoObjectSanitizeConstraint = MongoObjectSanitizeConstraint;
registerConstraint_1.registerConstraint.extend({
    base: objectSchema_1.ObjectSchema,
    name: "mongoSanitize",
    constraint: MongoObjectSanitizeConstraint
});
//# sourceMappingURL=mongoObjectSanitizeConstraint.js.map