"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const dateSchema_1 = require("../dateSchema");
const dateConverter_1 = require("../converters/dateConverter");
const ValidationError_1 = require("../../../common/errors/ValidationError");
class MaxConstraint {
    validate(params) {
        let options = params.options, value = params.value, maxValue = params.args[0], format = params.args[1];
        if (!(value instanceof Date)) {
            return { isValid: false };
        }
        let maxDate = dateConverter_1.DateConverter.convertValueToDate(maxValue, format);
        if (!maxDate) {
            return { isValid: false, errors: [new ValidationError_1.ValidationError("invalid max Date")] };
        }
        return { isValid: value.getTime() <= maxDate.getTime() };
    }
    get type() {
        return "date";
    }
    get defaultMessage() {
        return "${property} is over max date";
    }
}
exports.MaxConstraint = MaxConstraint;
registerConstraint_1.registerConstraint.extend({
    base: dateSchema_1.DateSchema,
    name: "max",
    constraint: MaxConstraint
});
//# sourceMappingURL=maxConstraint.js.map