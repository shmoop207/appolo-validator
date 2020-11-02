"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrorsError = void 0;
class ValidationErrorsError extends Error {
    constructor(errors) {
        super("Validations Failed");
        this.errors = errors;
        Object.setPrototypeOf(this, ValidationErrorsError.prototype);
    }
    get message() {
        return this.errors.map(error => error.message).join("\n");
    }
    toString() {
        return this.message;
    }
}
exports.ValidationErrorsError = ValidationErrorsError;
//# sourceMappingURL=ValidationErrorsError.js.map