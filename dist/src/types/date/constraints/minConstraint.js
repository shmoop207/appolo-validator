"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const dateSchema_1 = require("../dateSchema");
const dateConverter_1 = require("../converters/dateConverter");
const ValidationError_1 = require("../../../common/errors/ValidationError");
class MinConstraint {
    validate(params) {
        let options = params.options, value = params.value, minValue = params.args[0], format = params.args[1];
        if (!(value instanceof Date)) {
            return { isValid: false };
        }
        let minDate = dateConverter_1.DateConverter.convertValueToDate(minValue, format);
        if (!minDate) {
            return { isValid: false, errors: [new ValidationError_1.ValidationError("invalid min Date")] };
        }
        return { isValid: value.getTime() >= minDate.getTime() };
    }
    get type() {
        return "date";
    }
    get defaultMessage() {
        return "${property} is under min date";
    }
}
exports.MinConstraint = MinConstraint;
registerConstraint_1.registerConstraint.extend({
    base: dateSchema_1.DateSchema,
    name: "min",
    constraint: MinConstraint
});
//# sourceMappingURL=minConstraint.js.map