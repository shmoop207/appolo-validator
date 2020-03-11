"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationErrorsError extends Error {
    constructor(errors) {
        super("validations failed");
        this.errors = errors;
        Object.setPrototypeOf(this, ValidationErrorsError.prototype);
    }
    toString() {
        return this.errors.map(error => error.message).join("\n");
    }
}
exports.ValidationErrorsError = ValidationErrorsError;
//# sourceMappingURL=ValidationErrorsError.js.map