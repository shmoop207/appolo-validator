"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlugStringConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class SlugStringConstraint {
    validate(params) {
        const value = params.value;
        let regex = /^[^-_](?!.*?[-_]{2,})([a-z0-9\\-]{1,}).*[^-_]$/;
        return { isValid: typeof value == "string" && regex.test(value) };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} is not valid slug string";
    }
}
exports.SlugStringConstraint = SlugStringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "slug",
    constraint: SlugStringConstraint
});
//# sourceMappingURL=slugStringConstraint.js.map