"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoSanitizeConstraint = void 0;
const stringSchema_1 = require("../stringSchema");
const registerConstraint_1 = require("../../../schema/registerConstraint");
class MongoSanitizeConstraint {
    validate(params) {
        let value = params.value;
        if (typeof value === "string" && value.includes("$where")) {
            value = value.replace("$where", "_");
        }
        return { isValid: typeof value == "string" && !value.includes("$where") };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} is not valid value";
    }
}
exports.MongoSanitizeConstraint = MongoSanitizeConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "mongoSanitize",
    constraint: MongoSanitizeConstraint
});
//# sourceMappingURL=mongoSanitizeConstraint.js.map