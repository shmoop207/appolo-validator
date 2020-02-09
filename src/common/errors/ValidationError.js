"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
    constructor(params) {
        super();
        this.params = params;
        if (!params.constraints) {
            params.constraints = {};
        }
        if (!params.children) {
            params.children = [];
        }
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
    get target() {
        return this.params.target;
    }
    get property() {
        return this.params.property;
    }
    get value() {
        return this.params.value;
    }
    get constraints() {
        return this.params.constraints;
    }
    get children() {
        return this.params.children;
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=ValidationError.js.map