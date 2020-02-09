"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerValidator_1 = require("../register/registerValidator");
class IsNumberValidator {
    async validate(args) {
        let options = args.options, value = args.value;
        if (typeof args.value !== "number") {
            return false;
        }
        if (options.allowInfinity && (args.value === Infinity || args.value === -Infinity)) {
            return true;
        }
        if (options.allowNaN && Number.isNaN(args.value)) {
            return true;
        }
        return Number.isFinite(value);
    }
    get name() {
        return "IsNumber";
    }
    defaultMessage(args) {
        return `${args.value} is not a number`;
    }
}
exports.IsNumberValidator = IsNumberValidator;
registerValidator_1.registerValidator.extend("isNumber", function (options) {
    return registerValidator_1.registerValidator.register(this, { options: options, validationClass: IsNumberValidator });
});
//# sourceMappingURL=isNumberValidator.js.map