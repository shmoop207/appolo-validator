"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("appolo-utils/index");
class ObjectConstraint {
    async validate(args) {
        let isValid = index_1.Objects.isPlain(args.value);
        return { isValid };
    }
    get type() {
        return "IsObject";
    }
    defaultMessage(args) {
        return `is not a valid object`;
    }
}
exports.ObjectConstraint = ObjectConstraint;
//# sourceMappingURL=objectConstraint.js.map