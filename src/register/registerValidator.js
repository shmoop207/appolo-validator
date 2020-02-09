"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
class RegisterValidator {
    extend(name, fn) {
        schema_1.Schema.prototype[name] = fn;
    }
    register(validator, schema) {
        validator.addValidation(schema);
        return validator;
    }
}
exports.RegisterValidator = RegisterValidator;
exports.registerValidator = new RegisterValidator();
//# sourceMappingURL=registerValidator.js.map