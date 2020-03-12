"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const dateSchema_1 = require("../dateSchema");
const date_fns_1 = require("date-fns");
class isDateConstraint {
    validate(args) {
        let options = args.options, value = args.value;
        if (value instanceof Date && !isNaN(value.getTime()) && date_fns_1.isValid(value)) {
            return { isValid: true };
        }
        return { isValid: false };
    }
    get type() {
        return "date";
    }
    get defaultMessage() {
        return "${property} is not valid date";
    }
}
exports.isDateConstraint = isDateConstraint;
registerConstraint_1.registerConstraint.extend({
    base: dateSchema_1.DateSchema,
    name: "isDate",
    constraint: isDateConstraint
});
//# sourceMappingURL=isDateConstraint.js.map