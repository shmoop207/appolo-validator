"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumStringConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
const utils_1 = require("@appolo/utils");
class EnumStringConstraint {
    validate(params) {
        let value = params.value, enums = utils_1.Enums.enumValues(params.args[0]);
        return { isValid: enums.indexOf(value) > -1 };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} is not valid enum";
    }
}
exports.EnumStringConstraint = EnumStringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "enum",
    constraint: EnumStringConstraint
});
//# sourceMappingURL=enumStringConstraint.js.map