"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
    constructor() {
        super();
        this._constraints = [];
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
    get target() {
        return this._target;
    }
    set target(value) {
        this._target = value;
    }
    get property() {
        return this._property;
    }
    set property(value) {
        this._property = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    get message() {
        return this._message;
    }
    set message(value) {
        this._message = value;
    }
    get constraints() {
        return this._constraints;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=ValidationError.js.map