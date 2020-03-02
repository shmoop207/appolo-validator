"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("appolo-utils/index");
const registerConstraint_1 = require("../registerConstraint");
const objectSchema_1 = require("../../schema/types/objectSchema");
class IsPlainConstraint {
    async validate(args) {
        let isValid = index_1.Objects.isPlain(args.value);
        return { isValid };
    }
    get type() {
        return "isPlain";
    }
    defaultMessage(args) {
        return `is not a valid object`;
    }
}
exports.IsPlainConstraint = IsPlainConstraint;
registerConstraint_1.registerConstraint.extend({
    base: objectSchema_1.ObjectSchema,
    name: "isPlain",
    constraint: IsPlainConstraint
});
//# sourceMappingURL=isPlainConstraint.js.map